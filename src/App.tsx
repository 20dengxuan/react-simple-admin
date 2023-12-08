import RouterView from './router';
import AuthRouter from './router/guard';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { useTheme } from '/@/hooks/useTheme';

function App() {
  const { themeConfig } = useTheme();

  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <AuthRouter>
          <RouterView />
        </AuthRouter>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
