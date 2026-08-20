export type Employee = {
  id: number
  fullName: string
  email: string
  department: string
  position: string
  status: 'active' | 'vacation' | 'fired'
  hireDate: string
  salary: number
}

const names = [
  'Иванов Алексей',
  'Петрова Мария',
  'Сидоров Дмитрий',
  'Козлова Елена',
  'Смирнов Иван',
  'Волкова Ольга',
  'Новиков Сергей',
  'Морозова Анна',
]

const departments = ['Разработка', 'Аналитика', 'Тестирование', 'DevOps', 'Поддержка']
const positions = ['Developer', 'Senior Developer', 'QA', 'Analyst', 'Team Lead']
const statuses: Employee['status'][] = ['active', 'vacation', 'fired']

export const employees: Employee[] = []

for (let i = 0; i < 10000; i++) {
  const id = i + 1
  const name = names[i % names.length]
  const [lastName, firstName] = name.split(' ')

  employees.push({
    id,
    fullName: name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@test.ru`,
    department: departments[i % departments.length],
    position: positions[i % positions.length],
    status: statuses[i % statuses.length],
    hireDate: `${String((i % 28) + 1).padStart(2, '0')}.${String((i % 12) + 1).padStart(2, '0')}.${2016 + (i % 8)}`,
    salary: 90000 + (i % 50) * 2000,
  })
}
