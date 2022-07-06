import * as controller from './controller';

export async function render(): Promise<void> {
    // TODO render your app here
    controller.init();
    await controller.controlPopularResults();
    console.log('App is running');
}
