function board_with_holes_extrude_1_5_outline_fn(){
    return new CSG.Path2D([[120.160128,-177.6913385],[137.3329375,-89.344892]]).appendPoint([277.9493318,-89.1725995]).appendPoint([277.9493318,-174.1725995]).appendPoint([256.3464297,-200.8298337]).appendPoint([120.160128,-177.6913385]).close().innerToCAG()
.subtract(
    CAG.circle({"center":[207.9238523,-141.5229311],"radius":1.2})
.union(
    CAG.circle({"center":[274.3825249,-173.0327681],"radius":1.2})
).union(
    CAG.circle({"center":[124.8498727,-174.5280658],"radius":1.2})
).union(
    CAG.circle({"center":[274.1458097,-93.0174947],"radius":1.2})
).union(
    CAG.circle({"center":[140.1962057,-92.957605],"radius":1.2})
).union(
    CAG.circle({"center":[242.4865385,-104.6766713],"radius":2.2})
)).extrude({ offset: [0, 0, 1.5] });
}


function board_with_holes_thickness_extrude_4_5_outline_fn(){
    return new CSG.Path2D([[120.160128,-177.6913385],[137.3329375,-89.344892]]).appendPoint([277.9493318,-89.1725995]).appendPoint([277.9493318,-174.1725995]).appendPoint([256.3464297,-200.8298337]).appendPoint([120.160128,-177.6913385]).close().innerToCAG()
.subtract(
    CAG.circle({"center":[242.4865385,-104.6766713],"radius":2.2})
.union(
    CAG.circle({"center":[207.9238523,-141.5229311],"radius":2.2})
).union(
    CAG.circle({"center":[274.3825249,-173.0327681],"radius":2.2})
).union(
    CAG.circle({"center":[124.8498727,-174.5280658],"radius":2.2})
).union(
    CAG.circle({"center":[274.1458097,-93.0174947],"radius":2.2})
).union(
    CAG.circle({"center":[140.1962057,-92.957605],"radius":2.2})
)).extrude({ offset: [0, 0, 4.5] });
}




                function bottom_plate_case_fn() {
                    

                // creating part 0 of case bottom_plate
                let bottom_plate__part_0 = board_with_holes_extrude_1_5_outline_fn();

                // make sure that rotations are relative
                let bottom_plate__part_0_bounds = bottom_plate__part_0.getBounds();
                let bottom_plate__part_0_x = bottom_plate__part_0_bounds[0].x + (bottom_plate__part_0_bounds[1].x - bottom_plate__part_0_bounds[0].x) / 2
                let bottom_plate__part_0_y = bottom_plate__part_0_bounds[0].y + (bottom_plate__part_0_bounds[1].y - bottom_plate__part_0_bounds[0].y) / 2
                bottom_plate__part_0 = translate([-bottom_plate__part_0_x, -bottom_plate__part_0_y, 0], bottom_plate__part_0);
                bottom_plate__part_0 = rotate([0,0,0], bottom_plate__part_0);
                bottom_plate__part_0 = translate([bottom_plate__part_0_x, bottom_plate__part_0_y, 0], bottom_plate__part_0);

                bottom_plate__part_0 = translate([0,0,0], bottom_plate__part_0);
                let result = bottom_plate__part_0;
                
            

                // creating part 1 of case bottom_plate
                let bottom_plate__part_1 = board_with_holes_thickness_extrude_4_5_outline_fn();

                // make sure that rotations are relative
                let bottom_plate__part_1_bounds = bottom_plate__part_1.getBounds();
                let bottom_plate__part_1_x = bottom_plate__part_1_bounds[0].x + (bottom_plate__part_1_bounds[1].x - bottom_plate__part_1_bounds[0].x) / 2
                let bottom_plate__part_1_y = bottom_plate__part_1_bounds[0].y + (bottom_plate__part_1_bounds[1].y - bottom_plate__part_1_bounds[0].y) / 2
                bottom_plate__part_1 = translate([-bottom_plate__part_1_x, -bottom_plate__part_1_y, 0], bottom_plate__part_1);
                bottom_plate__part_1 = rotate([0,0,0], bottom_plate__part_1);
                bottom_plate__part_1 = translate([bottom_plate__part_1_x, bottom_plate__part_1_y, 0], bottom_plate__part_1);

                bottom_plate__part_1 = translate([0,0,0], bottom_plate__part_1);
                result = result.union(bottom_plate__part_1);
                
            
                    return result;
                }
            
            
        
            function main() {
                return bottom_plate_case_fn();
            }

        