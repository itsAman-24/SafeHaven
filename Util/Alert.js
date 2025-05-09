
const DEMO_ALERTS = [
  {
    id: 'alert1',
    title: 'Northern Border Alert',
    message: 'Military activity reported near northern border. Residents within 50km advised to prepare emergency kits.',
    type: 'warning',
    regions: ['Northern Territory'],
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'alert2',
    title: 'Western Evacuation Order',
    message: 'Immediate evacuation ordered for western districts. Proceed to designated shelters.',
    type: 'danger',
    regions: ['Western Province'],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
]

export default DEMO_ALERTS;