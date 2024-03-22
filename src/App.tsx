import Layout from "./Layout";
import HomePage from "@/components/HomePage";
import { Toaster } from "@/components/ui/toaster"
function App() {
  return (
    <Layout>
      <HomePage />
      <Toaster />
    </Layout>
  );
}

export default App;
