function switch_plate_extrude_1_5_outline_fn(){
    return new CSG.Path2D([[120.160128,-177.6913385],[137.3329375,-89.344892]]).appendPoint([250.9865385,-89.2056361]).appendPoint([250.9865385,-170.1766713]).appendPoint([277.9493318,-170.1766713]).appendPoint([277.9493318,-174.1725995]).appendPoint([256.3464297,-200.8298337]).appendPoint([120.160128,-177.6913385]).close().innerToCAG()
.subtract(
    CAG.circle({"center":[207.9238523,-141.5229311],"radius":1.2})
.union(
    CAG.circle({"center":[274.3825249,-173.0327681],"radius":1.2})
).union(
    CAG.circle({"center":[124.8498727,-174.5280658],"radius":1.2})
).union(
    CAG.circle({"center":[140.1962057,-92.957605],"radius":1.2})
).union(
    new CSG.Path2D([[214.2009956,-123.6421461],[227.9437762,-126.3134721]]).appendPoint([230.6151022,-112.5706915]).appendPoint([216.8723216,-109.8993655]).appendPoint([214.2009956,-123.6421461]).close().innerToCAG()
).union(
    new CSG.Path2D([[196.1225061,-117.0718936],[209.8652867,-119.7432196]]).appendPoint([212.5366127,-106.000439]).appendPoint([198.7938321,-103.329113]).appendPoint([196.1225061,-117.0718936]).close().innerToCAG()
).union(
    new CSG.Path2D([[176.8991627,-116.3914043],[190.6419433,-119.0627303]]).appendPoint([193.3132693,-105.3199497]).appendPoint([179.5704887,-102.6486237]).appendPoint([176.8991627,-116.3914043]).close().innerToCAG()
).union(
    new CSG.Path2D([[157.6758192,-115.7109149],[171.4185998,-118.3822409]]).appendPoint([174.0899258,-104.6394603]).appendPoint([160.3471452,-101.9681343]).appendPoint([157.6758192,-115.7109149]).close().innerToCAG()
).union(
    new CSG.Path2D([[139.0249027,-112.085544],[152.7676833,-114.75687]]).appendPoint([155.4390093,-101.0140894]).appendPoint([141.6962287,-98.3427634]).appendPoint([139.0249027,-112.085544]).close().innerToCAG()
).union(
    new CSG.Path2D([[221.4033725,-186.165148],[235.1461531,-188.836474]]).appendPoint([237.8174791,-175.0936934]).appendPoint([224.0746985,-172.4223674]).appendPoint([221.4033725,-186.165148]).close().innerToCAG()
).union(
    new CSG.Path2D([[232.2794852,-130.2123986],[246.0222658,-132.8837246]]).appendPoint([248.6935918,-119.140944]).appendPoint([234.9508112,-116.469618]).appendPoint([232.2794852,-130.2123986]).close().innerToCAG()
).union(
    new CSG.Path2D([[228.6541143,-148.863315],[242.3968949,-151.534641]]).appendPoint([245.0682209,-137.7918604]).appendPoint([231.3254403,-135.1205344]).appendPoint([228.6541143,-148.863315]).close().innerToCAG()
).union(
    new CSG.Path2D([[225.0287434,-167.5142315],[238.771524,-170.1855575]]).appendPoint([241.44285,-156.4427769]).appendPoint([227.7000694,-153.7714509]).appendPoint([225.0287434,-167.5142315]).close().innerToCAG()
).union(
    new CSG.Path2D([[210.5756247,-142.2930626],[224.3184053,-144.9643886]]).appendPoint([226.9897313,-131.221608]).appendPoint([213.2469507,-128.550282]).appendPoint([210.5756247,-142.2930626]).close().innerToCAG()
).union(
    new CSG.Path2D([[206.9502538,-160.943979],[220.6930344,-163.615305]]).appendPoint([223.3643604,-149.8725244]).appendPoint([209.6215798,-147.2011984]).appendPoint([206.9502538,-160.943979]).close().innerToCAG()
).union(
    new CSG.Path2D([[203.3248829,-179.5948955],[217.0676635,-182.2662215]]).appendPoint([219.7389895,-168.5234409]).appendPoint([205.9962089,-165.8521149]).appendPoint([203.3248829,-179.5948955]).close().innerToCAG()
).union(
    new CSG.Path2D([[192.4971352,-135.7228101],[206.2399158,-138.3941361]]).appendPoint([208.9112418,-124.6513555]).appendPoint([195.1684612,-121.9800295]).appendPoint([192.4971352,-135.7228101]).close().innerToCAG()
).union(
    new CSG.Path2D([[188.8717643,-154.3737266],[202.6145449,-157.0450526]]).appendPoint([205.2858709,-143.302272]).appendPoint([191.5430903,-140.630946]).appendPoint([188.8717643,-154.3737266]).close().innerToCAG()
).union(
    new CSG.Path2D([[185.2463934,-173.024643],[198.989174,-175.695969]]).appendPoint([201.6605,-161.9531884]).appendPoint([187.9177194,-159.2818624]).appendPoint([185.2463934,-173.024643]).close().innerToCAG()
).union(
    new CSG.Path2D([[173.2737918,-135.0423207],[187.0165724,-137.7136467]]).appendPoint([189.6878984,-123.9708661]).appendPoint([175.9451178,-121.2995401]).appendPoint([173.2737918,-135.0423207]).close().innerToCAG()
).union(
    new CSG.Path2D([[169.6484209,-153.6932372],[183.3912015,-156.3645632]]).appendPoint([186.0625275,-142.6217826]).appendPoint([172.3197469,-139.9504566]).appendPoint([169.6484209,-153.6932372]).close().innerToCAG()
).union(
    new CSG.Path2D([[166.0230499,-172.3441537],[179.7658305,-175.0154797]]).appendPoint([182.4371565,-161.2726991]).appendPoint([168.6943759,-158.6013731]).appendPoint([166.0230499,-172.3441537]).close().innerToCAG()
).union(
    new CSG.Path2D([[154.0504483,-134.3618314],[167.7932289,-137.0331574]]).appendPoint([170.4645549,-123.2903768]).appendPoint([156.7217743,-120.6190508]).appendPoint([154.0504483,-134.3618314]).close().innerToCAG()
).union(
    new CSG.Path2D([[150.4250774,-153.0127479],[164.167858,-155.6840739]]).appendPoint([166.839184,-141.9412933]).appendPoint([153.0964034,-139.2699673]).appendPoint([150.4250774,-153.0127479]).close().innerToCAG()
).union(
    new CSG.Path2D([[146.7997065,-171.6636643],[160.5424871,-174.3349903]]).appendPoint([163.2138131,-160.5922097]).appendPoint([149.4710325,-157.9208837]).appendPoint([146.7997065,-171.6636643]).close().innerToCAG()
).union(
    new CSG.Path2D([[135.3995318,-130.7364605],[149.1423124,-133.4077865]]).appendPoint([151.8136384,-119.6650059]).appendPoint([138.0708578,-116.9936799]).appendPoint([135.3995318,-130.7364605]).close().innerToCAG()
).union(
    new CSG.Path2D([[131.7741609,-149.387377],[145.5169415,-152.058703]]).appendPoint([148.1882675,-138.3159224]).appendPoint([134.4454869,-135.6445964]).appendPoint([131.7741609,-149.387377]).close().innerToCAG()
).union(
    new CSG.Path2D([[128.14879,-168.0382934],[141.8915706,-170.7096194]]).appendPoint([144.5628966,-156.9668388]).appendPoint([130.820116,-154.2955128]).appendPoint([128.14879,-168.0382934]).close().innerToCAG()
).union(
    new CSG.Path2D([[240.7724974,-190.5122453],[254.0872887,-194.8384832]]).appendPoint([258.4135266,-181.5236919]).appendPoint([245.0987353,-177.197454]).appendPoint([240.7724974,-190.5122453]).close().innerToCAG()
)).extrude({ offset: [0, 0, 1.5] });
}




                function switch_plate_case_fn() {
                    

                // creating part 0 of case switch_plate
                let switch_plate__part_0 = switch_plate_extrude_1_5_outline_fn();

                // make sure that rotations are relative
                let switch_plate__part_0_bounds = switch_plate__part_0.getBounds();
                let switch_plate__part_0_x = switch_plate__part_0_bounds[0].x + (switch_plate__part_0_bounds[1].x - switch_plate__part_0_bounds[0].x) / 2
                let switch_plate__part_0_y = switch_plate__part_0_bounds[0].y + (switch_plate__part_0_bounds[1].y - switch_plate__part_0_bounds[0].y) / 2
                switch_plate__part_0 = translate([-switch_plate__part_0_x, -switch_plate__part_0_y, 0], switch_plate__part_0);
                switch_plate__part_0 = rotate([0,0,0], switch_plate__part_0);
                switch_plate__part_0 = translate([switch_plate__part_0_x, switch_plate__part_0_y, 0], switch_plate__part_0);

                switch_plate__part_0 = translate([0,0,0], switch_plate__part_0);
                let result = switch_plate__part_0;
                
            
                    return result;
                }
            
            
        
            function main() {
                return switch_plate_case_fn();
            }

        