import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Import the black theme
import "tailwindcss/tailwind.css";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBox = () => {
  const code = `
    const App = () => {
        return (
          <div className="flex flex-col items-center justify-center">
            <EmojiMessage emoji="👋" message="Hello there!" />
            <EmojiMessage emoji="🌟" message="Welcome!" />
            <EmojiMessage emoji="🚀" message="Let's have some fun!" />
          </div>
        );
      };
      
      export default App;
    `;

  const code2 = `
  const createHappinessMessage = () => {
    const randomEmoji = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
    const randomPhrase = happinessPhrases[Math.floor(Math.random() * happinessPhrases.length)];
     return ${"`${randomEmoji} ${randomPhrase}${randomEmoji}`"};
  };
  
  // Display multiple happiness messages
  for (let i = 0; i < 5; i++) {
    const message = createHappinessMessage();
    console.log(message);
  }
      ;
    `;
  return (
    <div className="w-full  p-2 bg-transparent shadow-lg  rounded-md">
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {code2}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBox;
