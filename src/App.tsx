import { EmployeeTable } from './EmployeeTable'
import { employees } from './mockEmployees'

export default function App() {
  return (
    <div className="page">
      <h1>Сотрудники</h1>
      <p className="count">Всего: {employees.length}</p>
      <EmployeeTable data={employees} />
    </div>
  )
}
