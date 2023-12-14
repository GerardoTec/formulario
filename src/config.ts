module.exports = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };