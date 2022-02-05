import React, { Suspense, useState } from "react";
import AlwaysSuspend, {
  DataLoader,
  DataLoader1,
  DataLoader2,
  fetchData1,
  RenderingNotifier,
  SometimesSuspend,
} from "./AlwaysSuspend";
import "./App.css";
import { Loadable } from "./Loadable";

function App() {
  const [data1] = useState(() => new Loadable(fetchData1()));
  const [data2] = useState(() => new Loadable(fetchData1()));
  const [data3] = useState(() => new Loadable(fetchData1()));
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data1} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data2} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader data={data3} />
      </Suspense>
    </div>
  );
}

export default App;
