import store from 'react-native-simple-store';

// Flux
import alt from '../alt';
import ProdActions from '../actions/prod-action';

class ProdStore{
    constructor() {


        this.bindListeners({
            handleSelectProd: ProdActions.SELECT_PROD,            
        });

        let selectedProd = store.get('selectedProd');

        this.state = {
            selectedProd: selectedProd ? selectedProd : '',      
        };
    }


    handleSelectProd(prod){
        this.setState({selectedProd : prod});
        store.save('selectedProd', prod);
    }

    
}


module.exports = alt.createStore(ProdStore, 'ProdStore');