import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { theme } from "./styles/theme";
import { Page } from "./components/Page";
import "./App.css";

// Route component that uses the slug from URL
function PageRoute() {
  const { "*": slug } = useParams();
  // Homepage uses "/" as slug, other pages use the slug without leading slash
  const pageSlug = !slug || slug === "" ? "/" : slug;
  return <Page slug={pageSlug} />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<PageRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
