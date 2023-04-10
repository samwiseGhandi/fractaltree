function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5)); // Output: 120

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth / 1.5;
    canvas.height = window.innerHeight /1.5;

    function drawLine(x1, y1, x2, y2, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawTree(x1, y1, angle, depth) {
        if (depth === 0) return;

        const x2 = x1 + Math.cos(angle) * depth * 8;
        const y2 = y1 + Math.sin(angle) * depth * 8;

        setTimeout(() => {
            drawLine(x1, y1, x2, y2, "hotpink");
            drawTree(x2, y2, angle - Math.PI / 4, depth - 1);
            drawTree(x2, y2, angle + Math.PI / 4, depth - 1);
        }, 1000);
    }

    drawTree(canvas.width / 2, canvas.height - 50, -Math.PI / 2, 6);
});
