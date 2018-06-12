import alt from '../alt';

class ProdActions {
  updateProds() {
    return true;
  }

  addProd(prod) {
    return prod;
  }

  deleteProd(prod) {
    return prod;
  }

  selectProd(prod) {
    return prod;
  }

}

module.exports = alt.createActions(ProdActions);
