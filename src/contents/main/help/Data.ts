interface Props {
    question: string,
    answer: string,
    link_url?: string
}

export const help_data: Props[] = [
    {
        question: "How dose the autoclicker work ?",
        answer: `You can customise your own scripts to your use case.

        It's important to make your script start time in acesending order, this will prevent errors and prevent scripts starting at random time interval.
        `,
    },
    {
        question: "Can't detect color on open applications.",
        answer: `On Mac turn on.
        Settings - Security & Privacy - Privacy - Screen Recording.

        Make sure to remove autoclicker app first and add autoclicker app again.
        `,
    },
    {
        question: "Mouse not moving or clicking.",
        answer: `On Mac turn on.
        Settings - Security & Privacy - Privacy - Accessibility.

        Make sure to remove autoclicker app first and add autoclicker app again.
        `,
    },
    {
        question: "Using a montor.",
        answer: `Robotjs does not work on connected monitors.`,
    },
    {
        question: "Can't detect on montiors, hover mouse on main screen.",
        answer: `Robotjs can't detect pixel color on your connected monitors.
        
        Pixel color can only be detected when the mouse is hovered over your main computer screen.
        `,
    },
    {
        question: "Working with getPixelColor.",
        answer: ` Colors are detected in hexadecimal and only execute if the color matches the {x,y} location set.

        If the color matches you can pick robotjs options that will execute instantly.
        `,
    },
    {
        question: "What is time filler ?",
        answer: `Time filler is used when you need to give your script more time to complete. 
         
        A good use case is at the end of your script before the loop restarts.
        `,
    },
    {
        question: "What is start at x loop ?",
        answer: ` These scripts will only run if the remainder equals 0.
        
        The remainder operator (%) returns the remainder left over when one operand (loop) is divided by a second operand (x)
        `,
        link_url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder"
    },
    {
        question: "What is skip at x loop ?",
        answer: ` These scripts will not run if the remainder equals 0.
        
        The remainder operator (%) returns the remainder left over when one operand (loop) is divided by a second operand (x)
        `,
        link_url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder"
    },
    {
        question: "Where to find more script command information ?",
        answer: "Link to robotjs",
        link_url: "http://robotjs.io/docs/syntax",
    },
    {
        question: "What is export and import ?",
        answer: ` Export is used when you want to copy or share the currrent script.

        Import is used when you want to edit or paste a script you have currently just exported or copied from a friend.

        To import a script you like to customise.

        1. Find a script.
        2. Copy from others or click on menu to find "export".
        3. Click on import on the side.

        Note, when importing scripts from others their main computer screen width and height might be different. 
        This will cause inaccurate movements, so you will need to update these scripts.
        `,
    },
]