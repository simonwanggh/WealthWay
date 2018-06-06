import alt from '../alt';

class SxActions {
  updateSxs() {
    return true;
  }

  addSx(sx) {
    return sx;
  }

  deleteSx(sx) {
    return sx;
  }

  selectSx(sx) {
    return sx;
  }

}

module.exports = alt.createActions(SxActions);
