// @ts-nocheck

import Lazyload from "./Lazyload";

const VueLazyload = {
  install(app, options) {
    const lazyLoad = new Lazyload(options);

    app.directive("lazy", {
      mounted: lazyLoad.bindLazy.bind(lazyLoad),
    });
  },
};

export default VueLazyload;
