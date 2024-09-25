// Import the p5 type if necessary
import p5 from 'p5';

class Turtle {
    private p: p5;
    private x: number;
    private y: number;
    private angle: number; // degrees
    private isPenDown: boolean;
    
    constructor(p: p5, x: number, y: number, angle: number) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.isPenDown = true;
    }

    // move forward by distance in angular direction
    forward(distance: number): void {
        const rads: number = this.p.radians(this.angle - 90);

        const newX: number = this.x + distance * this.p.cos(rads);
        const newY: number = this.y + distance * this.p.sin(rads);

        if (this.isPenDown) {
            this.p.line(this.x, this.y, newX, newY);
        }

        this.x = newX;
        this.y = newY;
    }

    backward(distance: number): void {
        this.forward(-distance);
    }

    // rotate left by degrees
    left(degrees: number): void {
        this.angle -= degrees;
    }

    // rotate right by degrees
    right(degrees: number): void {
        this.angle += degrees;
    }

    // lower pen -> draw lines
    penDown(): void {
        this.isPenDown = true;
    }

    // lift pen -> dont draw lines
    penUp(): void {
        this.isPenDown = false;
    }


    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getCoordinates(): [number, number] {
        return [this.getX(), this.getY()];
    }

    getAngle(): number {
        return this.angle;
    }

    getState(): { x: number; y: number; angle: number } {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        };
    }

    setX(x: number): void {
        this.x = x;
    }


    setY(y: number): void {
        this.y = y;
    }

    setAngle(angle: number): void {
        this.angle = angle;
    }

    setState(state: { x: number; y: number; angle: number }): void {
        this.x = state.x;
        this.y = state.y;
        this.angle = state.angle;
    }
}

export default Turtle;
