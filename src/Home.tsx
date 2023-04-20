import { createContext, useContext, useState } from "react";

const CountContext = createContext({ count: 6 } as any);

export function Header() {
  const { count } = useContext(CountContext);

  return <h3>Header {count} </h3>;
}

export function Main() {
  const { count, setCount } = useContext(CountContext);

  return (
    <div style={{ height: "50vh", backgroundColor: "#eee" }}>
      <h2>Main {count}</h2>
      <button
        type="button"
        onClick={() => setCount((state: number) => state + 1)}
      >
        {" "}
        Add{" "}
      </button>
    </div>
  );
}

export function Footer() {
  const { count } = useContext(CountContext);

  return <h3>Footer {count}</h3>;
}

export function Home() {
  const [count, setCount] = useState(2);

  return (
    <div>
      <CountContext.Provider value={{ count, setCount }}>
        <Header />
        <Main />
        <Footer />
      </CountContext.Provider>
    </div>
  );
}
