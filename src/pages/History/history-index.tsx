import { HistoryContainer, HistoryList, Status } from "./history-styles";


export function History() {
    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>

            <HistoryList>

                <table>

                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 3 meses</td>
                            <td><Status statusColor="green">Concluido</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa2</td>
                            <td>20 minutos</td>
                            <td>Há 5 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                            
                        </tr>
                        <tr>
                            <td>Tarefa3</td>
                            <td>20 minutos</td>
                            <td>Há 4 meses</td>
                            <td><Status statusColor="green">Concluido</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa4</td>
                            <td>20 minutos</td>
                            <td>Há 3 meses</td>
                            <td><Status statusColor="red">Cancelado</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa5</td>
                            <td>20 minutos</td>
                            <td>Há 3 meses</td>
                            <td><Status statusColor="yellow">Em andamento</Status></td>
                        </tr>
                    </tbody>

                </table>

            </HistoryList>

        </HistoryContainer>
    )
}