import { Summary } from '../../api/Summary';

export async function fetchAllItems() {
    const monthYear = document.getElementById('summ-monthYear') as HTMLInputElement | null;
    const date = monthYear?.value || '';
    const [ano, mes] = date ? date.split('-') : [undefined, undefined];

    const summary = new Summary();

    // Busca segura do resumo mensal (só se tiver data)
    let resultSumm: any = null;

    if (ano && mes) {
        resultSumm = await summary.summaryMonthly({ ano, mes });
    }

    // Busca do resumo global
    let resultSummGlobal = await summary.summaryGlobal();

    const incomeResultFilter = resultSumm && resultSumm.result && typeof resultSumm.result.totalReceitas !== 'undefined'
        ? +resultSumm.result.totalReceitas : 0;

    const expenseResultFilter = resultSumm && resultSumm.result && typeof resultSumm.result.totalDespesas !== 'undefined'
        ? +resultSumm.result.totalDespesas : 0;

    const balanceFilter = resultSumm && resultSumm.result && typeof resultSumm.result.saldo !== 'undefined'
        ? +resultSumm.result.saldo : 0;

    const globalResult = resultSummGlobal?.result;

    const incomeResult = globalResult && typeof globalResult.valorTotalReceitas !== 'undefined'
        ? +globalResult.valorTotalReceitas : 0;

    const expenseResult = globalResult && typeof globalResult.valorTotalDespesas !== 'undefined'
        ? +globalResult.valorTotalDespesas : 0;

    const fallbackBalance = resultSummGlobal?.result?.saldo;
    const balanceResult = resultSummGlobal && typeof fallbackBalance !== 'undefined' ? +fallbackBalance : 0;

    return {
        incomeResultFilter,
        expenseResultFilter,
        balanceFilter,
        incomeResult,
        expenseResult,
        balanceResult
    };
}