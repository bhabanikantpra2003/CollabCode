function dedent(strings: TemplateStringsArray) {
    const match = strings[0].match(/^[ \t]*(?=\S)/gm);
    const indent = match && Math.min(...match.map(el => el.length));
    if (indent) {
        const regexp = new RegExp(`^ {${indent}}`, 'gm');
        return strings.map(part => part.replace(regexp, '')).join('');
    }
    return strings.join('');
}

export const templates = {
    html: dedent`
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Your Page</title>
        </head>
        <body>
            <h1>Hello, world!</h1>
        </body>
        </html>`,

    cssTemplate: dedent`
        /* Add your styles here */
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        h1 {
            color: #333;
            text-align: center;
            font-size: 3rem;
        }`,

    javascript: dedent`
        // Add your JavaScript here
        console.log('Hello, world!');`,

    java: dedent`
        // Add your Java code here
        public class Main {
            public static void main(String[] args) {
                System.out.println("Hello, world!");
            }
        }`,

    python: dedent`
        # Add your Python code here
        print('Hello, world!')`,
    go : dedent`
        // Add your Go code here
        package main
        import "fmt"
        func main() {
            fmt.Println("Hello, world!")
        }`,
    c : dedent`
        // Add your C code here
        #include <stdio.h>
        int main() {
            printf("Hello, world!\\n");
            return 0;
        }`,
    cpp : dedent`
        // Add your C++ code here
        #include <iostream>
        int main() {
            std::cout << "Hello, world!" << std::endl;
            return 0;
        }`
}