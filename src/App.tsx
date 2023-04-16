import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'modules/layout';
import { RouteManager } from 'modules/router';

import 'styles/index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Layout>
          <RouteManager />
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
