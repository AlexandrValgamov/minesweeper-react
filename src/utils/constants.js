export const gameOptions = [
  { label: 'Простой', level: "easy", gridSize: { col: 8, row: 8 }, mineCount: 10, color: '#adeecf' },
  { label: 'Средний', level: "medium", gridSize: { col: 16, row: 16 }, mineCount: 40, color: '#fdd365' },
  { label: 'Сложный', level: "hard", gridSize: { col: 32, row: 16 }, mineCount: 100, color: '#fc7753' }
]

export const defaultLeaders = {
  'easy': [
    {"name": "Светлана", "time": 15},
    {"name": "Марина", "time": 27},
    {"name": "Сергей", "time": 38},
    {"name": "Иван", "time": 48},
    {"name": "Екатерина", "time": 80},
    {"name": "Елена", "time": 83},
    {"name": "Дарья", "time": 95},
    {"name": "Юлия", "time": 249},
    {"name": "Максим", "time": 267},
    {"name": "Артем", "time": 278}
  ],
  'medium': [
    {"name": "Екатерина", "time": 395},
    {"name": "Ксения", "time": 407},
    {"name": "Петр", "time": 426},
    {"name": "Артем", "time": 455},
    {"name": "Анна", "time": 487},
    {"name": "Николай", "time": 514},
    {"name": "Владимир", "time": 523},
    {"name": "Сергей", "time": 542},
    {"name": "Дарья", "time": 552},
    {"name": "Дмитрий", "time": 570}
  ],
  'hard': [
    {"name": "Сергей", "time": 620},
    {"name": "Татьяна", "time": 659},
    {"name": "Дмитрий", "time": 693},
    {"name": "Светлана", "time": 718},
    {"name": "Екатерина", "time": 761},
    {"name": "Дарья", "time": 767},
    {"name": "Николай", "time": 777},
    {"name": "Иван", "time": 788},
    {"name": "Петр", "time": 886},
    {"name": "Ольга", "time": 894}
  ]
}