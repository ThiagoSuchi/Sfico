import { Summary } from '../../api/Summary';
import { modelCreatedOrUpdatedOrDeleted, modelMessage } from './modelItemCreate';

export async function fetchAllItems() {
    const monthYear = document.getElementById('summ-monthYear') as HTMLInputElement;
    const date = monthYear.value;
    const [ano, mes] = date.split('-');

    const dateFormat = {
        ano,
        mes
    }

    // Sessão de resumo mensal
    const summary = new Summary();
    const resultSumm = await summary.summaryMonthly(dateFormat)
    
    if (!resultSumm){
        modelMessage('Essa data não possuí registros.')
    }

    modelCreatedOrUpdatedOrDeleted(resultSumm.message);
    
    

    // Sessão de resumo global
    

    return { 
       incomeResultFilter: resultSumm.result.totalReceitas,
       expenseResultFilter: resultSumm.result.totalDespesas
    };
}