var ipX;
var ipY;
var ipS;
var Collision;

function create_opt_b() {
    apply = createButton("適用");
    ipX = createInput('');
    ipY = createInput('');
    ipS = createInput('');
    Collision = createCheckbox("Collision", false);
    createP("X").position(500, 720);
    createP("Y").position(500, 750);
    createP("Size").position(490, 780);

    apply.position(750, 790);
    ipX.position(525, 738);
    ipY.position(525, 768);
    ipS.position(525, 798);
    Collision.position(525, 828);

    apply.mousePressed(apply_c);
}

function obj_info(select) {
    if (mouseX > MAPSIZE_X || mouseX < 0 || mouseY > 590 || mouseY < 0) return
    if (select >= 0) {
        ipX.value(obj_data[select].x);
        ipY.value(obj_data[select].y);
        ipS.value(obj_data[select].s);
        Collision.checked(obj_data[select].collision);
    }
}

function apply_c() {
    print(select)
    if (select < 0)
        return
    obj_data[select].x = Number(ipX.value());
    obj_data[select].y = Number(ipY.value());
    obj_data[select].s = Number(ipS.value());
    obj_data[select].collision = Collision.checked();

    print("setX:" + obj_data[select].x)
    print("setY:" + obj_data[select].y)
    print("setS:" + obj_data[select].s)
}