import NavigationProvider from "./providers/NavigationProvider";
import AppLayout from "./AppLayout";

const App = () => {
  return (
    <NavigationProvider>
      <AppLayout />
    </NavigationProvider>
  );
};

export default App;
