import { Injectable, Injector, NgModuleFactoryLoader, NgModuleRef, NgModuleFactory, Optional, Compiler } from '@angular/core';

export const lazyModules = {
    tile: {
        loadChildren: () => import('../lazy-dashboard-tile/lazy-dashboard-tile.module').then(m => m.LazyDashboardTileModule)
    }
};

@Injectable({
    providedIn: 'root'
})
export class LazyDashboardTileService  {

    constructor(
        private loader: NgModuleFactoryLoader,
        private injector: Injector,
        @Optional() private compiler: Compiler
    ) {
    }

    private moduleRef: NgModuleRef<any>;

    load(): Promise<void> {
        
        if (this.moduleRef) {
            return Promise.resolve();
        }

        const path = 'projects/dashboard/src/app/lazy-dashboard-tile/lazy-dashboard-tile.module#LazyDashboardTileModule'
        
        return this
            .loader
            .load(path)
            .then(moduleFactory => {
                this.moduleRef = moduleFactory.create(this.injector).instance;
                console.debug('moduleRef', this.moduleRef);
            })
            .catch(err => {
                console.error('error loading module', err); 
            });
        
    }

    loadDynImport() {

        if (this.moduleRef) {
            return Promise.resolve();
        }

        return lazyModules['tile'].loadChildren()
            .then(moduleOrFactory => {
                if (moduleOrFactory instanceof NgModuleFactory) {
                    return moduleOrFactory;
                } else {
                    return this.compiler.compileModuleAsync(moduleOrFactory);
                }
            })
            .then(factory => {
                this.moduleRef = factory.create(this.injector).instance as unknown as NgModuleRef<any>;
            });
    }
}
 