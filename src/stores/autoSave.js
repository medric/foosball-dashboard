import mobx from 'mobx';

export default function autoSave(store, save) {
  let firstRun = true;
  mobx.autorun(() => {
    // Runs every time any observable property
    // on the store is updated.
    const json = JSON.stringify(mobx.toJS(store));
    if (!firstRun) {
      save(json);
    }
    firstRun = false;
  });
}