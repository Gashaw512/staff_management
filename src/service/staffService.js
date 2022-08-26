const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])
export const getAcademicRankCollection = () => ([
    { id: '1', title: 'Professor' },
    { id: '2', title: 'Associate Professor' },
    { id: '3', title: 'Assistant Professor' },
    { id: '4', title: 'PhD' },
 
])

export function insertEmployee(data) {
    let employees = getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}
export function updateEmployee(data){
    let employees=getAllEmployees();
    let recordIndex=employees.findIndex(x=>x.id==data.id)
    employees[recordIndex]={...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}
export function deleteEmployee(id){
    let employees=getAllEmployees();
    employees=employees.filter(x=>x.id!=id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
  
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let employees = JSON.parse(localStorage.getItem(KEYS.employees));

    let academicRanks = getAcademicRankCollection();
    console.log(employees)
    // console.log(employees==undefined)

   return employees.map(x => ({
         ...x,
          academicRank:academicRanks[x.academicRankID - 1].title
    }))
}