import { Provider } from "react-redux";
import { appStore } from "../../store";
import { Layout } from "../layout";

const App = () => {
  return (
    <Provider store={appStore}>
      <Layout />
    </Provider>
  );
};

export default App;
