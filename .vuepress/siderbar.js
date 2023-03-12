const { createSideBarConfig } = require('./util')
const RECORD_PATH = '/blogs/随记'
const PROJECT_PATH = '/blogs/项目'
const FRONTEND_PATH = '/blogs/前端'


module.exports = {
  [RECORD_PATH]: [createSideBarConfig('随记', RECORD_PATH)],
  [PROJECT_PATH]: [createSideBarConfig('项目', PROJECT_PATH)],
  [FRONTEND_PATH]: [createSideBarConfig('前端', FRONTEND_PATH)],
}
