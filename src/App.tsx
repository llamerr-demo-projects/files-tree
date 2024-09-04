import "./styles.css";
import { Button } from "antd";
import React from "react";

import { FolderTree } from "./components/FolderTree";

export default function App() {
  return (
    <div className="App">
      <Button>ANTD </Button>
      <tr />
      <FolderTree />
    </div>
  );
}
