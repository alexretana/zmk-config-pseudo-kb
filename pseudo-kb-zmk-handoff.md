# Pseudo-KB ZMK Firmware — Complete Handoff Brief

## Project Overview

This is a custom wireless split ergonomic keyboard called **pseudo-kb**. It consists of:

- **Left half**: nice!nano v2 microcontroller
- **Right half**: nice!nano v2 microcontroller (same reversible PCB, flipped)
- **Dongle**: Seeed Studio XIAO nRF52840 BLE (acts as the central/receiver, plugged into the host computer via USB)

Both keyboard halves are peripherals. The dongle is the central. Communication is over BLE. The dongle connects to the host via USB.

The keyboard uses:
- Kailh Choc v2 switches with hotswap sockets
- EC11 rotary encoder (one per half)
- nice!view display (one per half)
- THT diodes (1N4148)
- THT reset button (top-mount)

---

## Hardware Matrix

### Key Layout

The keyboard has the following zones per half:

**Matrix zone** — 6 columns × 4 rows (with `inner` column skipping the `utils` row):
- Columns: outer, pinky, ring, middle, index, inner
- Rows: utils (top), bottom, home, top

**Thumbfan zone** — 2 keys:
- Columns: home, far
- Row: lower

**Rotary encoder** — 1 per half:
- Rotation on ENC_A / ENC_B pins
- Push button wired into the key matrix at the intersection of R0 / C5 (the skipped inner_utils slot) via S1/S2

**Total keys per half**: 23 switches + 2 thumb keys + 1 encoder button = 26 key positions per half, 52 total.

Wait — let me recount carefully:
- Matrix: 6 cols × 4 rows = 24, minus inner_utils (skipped) = **23 keys**
- Thumbfan: 2 keys
- Encoder push: 1 (occupying the skipped inner_utils position in the matrix)
- **Total per half: 25 active matrix positions**
- **Total both halves: 50 key positions**

### GPIO Pin Mapping (from final ergogen config)

These are the net names and which nice!nano physical pin they map to. The ergogen config assigns nets to MCU pins as follows:

| Net Name | MCU Physical Pin | Function |
|----------|-----------------|----------|
| C0 | P21 | Column - outer |
| C1 | P20 | Column - pinky |
| C2 | P19 | Column - ring |
| C3 | P18 | Column - middle |
| C4 | P15 | Column - index |
| C5 | P14 | Column - inner + thumb home + encoder S2 |
| C6 | P8 | Column - thumb far + encoder S1... |
| R0 | P5 | Row - utils + thumb lower |
| R1 | P9 | Row - bottom |
| R2 | P10 | Row - home |
| R3 | P16 | Row - top |
| ENC_A | P6 | Rotary encoder channel A |
| ENC_B | P7 | Rotary encoder channel B |
| DISP_MOSI | P4 | nice!view SPI data |
| DISP_SCK | P3 | nice!view SPI clock |
| DISP_CS | P0 | nice!view SPI chip select |

**IMPORTANT**: The user rearranged pins during KiCad routing to minimize trace crossings. The mapping above reflects the FINAL state from their last ergogen config (document index 5 in our conversation). **You MUST cross-reference the ergogen YAML files in the repo to verify these mappings are correct.** Look at the `pcbs.my_keyboard.footprints.mcu.params` section — each line like `P21: C0` tells you which physical pin maps to which net.

### Pin-to-pro_micro Mapping

ZMK uses `&pro_micro` numbering for nice!nano pins. The nice!nano v2 is Pro Micro compatible, so the mapping is:

| Physical Pin | &pro_micro Number |
|-------------|------------------|
| P0.06 (D1) | 1 |
| P0.08 (D0) | 0 |
| P0.17 (D2) | 2 |
| P0.20 (D3) | 3 |
| P0.22 (D4) | 4 |
| P0.24 (D5) | 5 |
| P1.00 (D6) | 6 |
| P0.11 (D7) | 7 |
| P1.04 (D8) | 8 |
| P1.06 (D9) | 9 |
| P0.09 (D10) | 10 |
| P0.10 (D16) | 16 |
| P1.11 (D14) | 14 |
| P1.13 (D15) | 15 |
| P1.15 (D18) | 18 |
| P0.02 (D19) | 19 |
| P0.29 (D20) | 20 |
| P0.31 (D21) | 21 |

**CRITICAL**: Look up the actual nice!nano v2 pinout diagram to verify this table. The mapping between physical nRF52840 GPIO pins and `&pro_micro` numbers is what makes or breaks the firmware. An incorrect mapping means keys won't register or will register in wrong positions.

Reference: https://nicekeyboards.com/docs/nice-nano/pinout-schematic/

### Diode Direction

The diodes are wired `col2row` — columns drive HIGH, rows are read with pull-down. This must match the `diode-direction` in the kscan config.

---

## ZMK Shield File Structure

All files go in `config/boards/shields/pseudo_kb/`:

```
config/boards/shields/pseudo_kb/
├── Kconfig.shield          # Declares shield names
├── Kconfig.defconfig       # Default config (keyboard name, split settings, dongle settings)
├── pseudo_kb.dtsi          # Shared hardware: kscan matrix, matrix transform, encoder, display
├── pseudo_kb_left.overlay  # Left half: column GPIOs
├── pseudo_kb_right.overlay # Right half: column GPIOs + col-offset
├── pseudo_kb_dongle.overlay # Dongle: mock kscan, includes transform
├── pseudo_kb.keymap        # Default keymap (all layers)
├── pseudo_kb.zmk.yml       # Metadata
└── pseudo_kb.conf          # Kconfig options (sleep, encoder, display, studio)
```

### Key Design Decisions

1. **Dongle is central**: The dongle (XIAO BLE) runs the keymap logic. Both nice!nano halves are peripherals that just send matrix events.

2. **Both halves use identical column GPIOs**: Because the PCB is reversible (same board flipped), both halves have the same physical pin-to-column wiring. The right half uses `col-offset` in the matrix transform to differentiate.

3. **Encoder push button is in the matrix**: The EC11's S1/S2 pins are wired to R0/C5 (the skipped inner_utils slot), so it appears as a regular key in the matrix. No separate kscan needed for it.

4. **Encoder rotation needs a separate sensor node**: The A/B rotation signals use `alps,ec11` compatible driver with `zmk,keymap-sensors`.

5. **nice!view display**: Both halves have one. Include `nice_view_adapter nice_view` in the build.yaml shield list for each half.

6. **ZMK Studio support**: The user wants live keymap editing. This requires:
   - `CONFIG_ZMK_STUDIO=y` in conf
   - A `physical_layout` node with `keys` property (not just a matrix transform in `chosen`)
   - A `&studio_unlock` binding in the keymap
   - Reserved empty layers for future use

### Matrix Transform Layout

The combined matrix (both halves) should look like this conceptually:

```
Left half columns: 0-6 (C0, C1, C2, C3, C4, C5, C6)
Right half columns: 7-13 (mirrored C0-C6 with col-offset=7)

Rows 0-4: R0, R1, R2, R3, R4

Row mapping from ergogen:
  R0 = utils row + thumb lower row (shared)
  R1 = bottom row  
  R2 = home row
  R3 = top row
  R4 = thumb lower (BUT — in the final config, thumb lower uses R0, not R4!)
```

**IMPORTANT SUBTLETY**: In the user's final ergogen config, the thumbfan `lower` row uses `row_net: R0` (shared with the utils row). This means thumbs are NOT on a separate row — they're on R0, differentiated by their column (C5 for thumb home, C6 for thumb far). The encoder button is also on R0/C5. This means the matrix is actually 4 rows × 7 columns per half, NOT 5 rows × 7 columns. Adjust the matrix transform accordingly.

Corrected matrix layout per half (4 rows, 7 columns):

```
        C0     C1     C2     C3     C4     C5      C6
R3:     outer  pinky  ring   mid    index  inner   (empty)
R2:     outer  pinky  ring   mid    index  inner   (empty)  
R1:     outer  pinky  ring   mid    index  inner   (empty)
R0:     outer  pinky  ring   mid    index  enc/th  thumb_far
```

Where R0/C5 is shared between: utils row keys (outer through index), encoder button, and thumb home. But wait — inner_utils is SKIPPED, so R0/C5 is only the encoder button and thumb home. Actually, thumb home has `column_net: C5` in the final config. The encoder S2 is also C5, S1 is... let me check.

**YOU MUST verify the encoder S1/S2 net assignments from the ergogen config file in the repo.** In one version it was `S1: R1, S2: C6`, in another it was `S1: R0, S2: C5`. The final version matters for the matrix transform.

---

## build.yaml

```yaml
include:
  - board: seeeduino_xiao_ble
    shield: pseudo_kb_dongle
  - board: nice_nano_v2
    shield: pseudo_kb_left nice_view_adapter nice_view
    cmake-args: -DCONFIG_ZMK_SPLIT=y -DCONFIG_ZMK_SPLIT_ROLE_CENTRAL=n
  - board: nice_nano_v2
    shield: pseudo_kb_right nice_view_adapter nice_view
    cmake-args: -DCONFIG_ZMK_SPLIT=y -DCONFIG_ZMK_SPLIT_ROLE_CENTRAL=n
  - board: seeeduino_xiao_ble
    shield: settings_reset
  - board: nice_nano_v2
    shield: settings_reset
```

---

## Flashing Procedure

After the firmware builds successfully in GitHub Actions:

### Step 1: Flash settings_reset to ALL 3 devices

**Do NOT have multiple devices powered on simultaneously during this step.**

1. **XIAO BLE dongle**: Double-tap the tiny reset button on the XIAO. It mounts as a USB drive. Copy `settings_reset-seeeduino_xiao_ble-zmk.uf2` onto it. It auto-unmounts when done.
2. **Left nice!nano**: Double-tap the reset button (the THT button on the PCB). It mounts as `NICENANO`. Copy `settings_reset-nice_nano_v2-zmk.uf2` onto it.
3. **Right nice!nano**: Same procedure, same file as left.

### Step 2: Flash actual firmware to all 3 devices

1. **XIAO BLE dongle**: Double-tap reset. Copy `pseudo_kb_dongle-seeeduino_xiao_ble-zmk.uf2`.
2. **Left nice!nano**: Double-tap reset. Copy `pseudo_kb_left-nice_nano_v2-zmk.uf2`.
3. **Right nice!nano**: Double-tap reset. Copy `pseudo_kb_right-nice_nano_v2-zmk.uf2`.

### Step 3: Pairing

Power on all three devices. The halves automatically discover and pair to the dongle over BLE. Plug the dongle into the computer. It should appear as a keyboard named "Pseudo KB".

### Troubleshooting

- If keys don't register at all: wrong GPIO pin mapping in the kscan overlay.
- If keys register in wrong positions: matrix transform is off — the RC() mapping doesn't match physical wiring.
- If one half doesn't connect: re-flash settings_reset on all devices and try again.
- If the right half has mirrored key order: the col-offset or column GPIO order in the right overlay needs adjustment.

---

## Documentation Links

Cross-reference ALL of these before finalizing:

- **ZMK New Shield Guide**: https://zmk.dev/docs/development/hardware-integration/new-shield
- **ZMK Keyboard Scan (kscan) Config**: https://zmk.dev/docs/config/kscan
- **ZMK Matrix Transform / Layout Config**: https://zmk.dev/docs/config/layout
- **ZMK Split Keyboards**: https://zmk.dev/docs/features/split-keyboards
- **ZMK Dongle Setup**: https://zmk.dev/docs/development/hardware-integration/dongle
- **ZMK Studio Setup**: https://zmk.dev/docs/features/studio
- **ZMK Encoders**: https://zmk.dev/docs/features/encoders
- **ZMK Display Config**: https://zmk.dev/docs/config/displays
- **ZMK Physical Layouts (needed for Studio)**: https://zmk.dev/docs/development/hardware-integration/physical-layouts
- **ZMK Behaviors (for keymap)**: https://zmk.dev/docs/keymaps/behaviors/key-press
- **nice!nano v2 Pinout**: https://nicekeyboards.com/docs/nice-nano/pinout-schematic/
- **nice!view Documentation**: https://nicekeyboards.com/docs/nice-view/
- **XIAO BLE (seeeduino_xiao_ble) in ZMK**: https://zmk.dev/docs/hardware
- **ZMK User Setup (flashing guide)**: https://zmk.dev/docs/user-setup
- **ZMK Configuration Overview**: https://zmk.dev/docs/config
- **Example dongle config (Enki42 with XIAO BLE)**: https://github.com/aroum/zmk-enki42-dongle
- **Example dongle config (Hillside46)**: https://github.com/m-reiner/hillside46_zmk_with_dongle
- **Example dongle config (beekeeb HSHS52)**: https://beekeeb.com/how-to-add-dongle-and-prospector-support-to-hshs52-hshs46/

---

## Your Tasks

1. **Read the ergogen YAML file(s) in the repo** — specifically the `pcbs.my_keyboard.footprints.mcu.params` section to get the definitive pin-to-net mapping. This is the source of truth for GPIO assignments.

2. **Cross-reference the nice!nano pinout** to convert physical pin numbers (P0-P21) to `&pro_micro` numbers used in ZMK devicetree overlays.

3. **Build all shield files** listed above with correct GPIO mappings.

4. **Count the key positions carefully** — the number of bindings in each keymap layer MUST exactly match the number of entries in the matrix transform. Off-by-one errors here cause build failures.

5. **Verify the matrix transform accounts for**:
   - The skipped inner_utils position (occupied by encoder button)
   - Thumb keys sharing R0 with the utils row
   - The col-offset for the right half
   - The encoder button's matrix position

6. **Set up ZMK Studio support** — physical layout with keys property, studio_unlock binding, reserved layers.

7. **Walk the user through flashing** all 3 devices in the correct order.

8. **Test guidance**: Help the user create a test plan to verify each key registers correctly, the encoder works, and the display shows status.

---

## Ergogen Config Reference

The user's ergogen config files are in the repo. Key sections to look at:

- `points.zones.matrix.columns` — for column_net assignments
- `points.zones.matrix.rows` — for row_net assignments  
- `points.zones.thumbfan` — for thumb column_net and row_net
- `points.zones.rotary_knob` — for encoder position
- `pcbs.my_keyboard.footprints.mcu.params` — **THE DEFINITIVE PIN MAPPING**
- `pcbs.my_keyboard.footprints.rotary.params` — encoder net assignments (A, B, C, S1, S2)
- `pcbs.my_keyboard.footprints.display.params` — display net assignments (MOSI, SCK, CS)
