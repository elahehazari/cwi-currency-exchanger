import React, { useState } form "React"
import { Button } from "@material-ui/core";


const Test = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <Button variant="contained"
                onClick={() => setCount(cont + 1)}>
                click me</Button>
            <p>your number is {count}</p>
        </div>
    );
};
export default Test;