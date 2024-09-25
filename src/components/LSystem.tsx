import React, { useRef, useEffect } from 'react';
import Sketch from 'react-p5';
import p5 from 'p5';
import Turtle from '../Turtle'; // Ensure Turtle is correctly imported and is TypeScript compatible

const STEP_SIZE: number = 50;
// Define the structure of the parameters prop
interface LSystemParams {
  axiom: string;
  rules: Record<string, string>;
  iterations: number;
  angle: number;
}

interface LSystemProps {
  params: LSystemParams;
}

// Define the structure of a turtle's state for the stack
interface TurtleState {
  x: number;
  y: number;
  angle: number;
}

// recursive function to generate the L-system string
const lsystem = (
  axiom: string,
  rules: Record<string, string>,
  iterations: number
): string => {
  if (iterations === 0) {
    return axiom;
  } else {
    let temp = '';
    for (let i = 0; i < axiom.length; i++) {
      const currentChar = axiom[i];
      if (rules[currentChar]) {
        temp += rules[currentChar];
      } else {
        temp += currentChar;
      }
    }
    return lsystem(temp, rules, iterations - 1);
  }
};

// react component
const LSystem: React.FC<LSystemProps> = ({ params }) => {
  const p5Ref = useRef<p5 | null>(null);
  let turtle: Turtle;

  //setup
  const setup = (p5: p5, canvasParentRef: Element): void => {
    console.log('Setting up p5 canvas');

    p5.createCanvas(800, 800).parent(canvasParentRef); // Adjusted size for better performance
    p5.background(200); // Set background here for consistency

    turtle = new Turtle(p5, p5.width / 2, p5.height / 2, 0);

    p5.noLoop();
    p5Ref.current = p5; // Store the p5 instance in a ref for later access
  };

  //draw
  const draw = (p5: p5): void => {
    console.log('Drawing L-System');

    p5.background(200); 

    turtle = new Turtle(p5, p5.width / 2, p5.height / 2, 0);

    const stateStack: TurtleState[] = []; // stack to store turtle states

    const lsys: string = lsystem(params.axiom, params.rules, params.iterations);

    for (const char of lsys) {
      switch (char) {
        case 'F':
          turtle.forward(STEP_SIZE); // Reduced step size for better scaling
          break;
        case '+':
          turtle.right(params.angle);
          break;
        case '-':
          turtle.left(params.angle);
          break;
        case '[':
          // Push current turtle state (position and angle) onto the stack
          stateStack.push(turtle.getState());
          break;
        case ']':
          // Pop turtle state from the stack and restore position and angle
          const savedState: TurtleState | undefined = stateStack.pop();
          if (savedState) {
            turtle.setState(savedState);
          }
          break;
        default:
          // Ignore any other characters for now
          break;
      }
    }
  };

  // redraw when params change
  useEffect(() => {
    if (p5Ref.current) {
      p5Ref.current.redraw();
    }
  }, [params]);

  return <Sketch setup={setup} draw={draw} />;
};

export default LSystem;
