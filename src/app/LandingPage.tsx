import { FaBookOpen, FaUserSecret } from "react-icons/fa";
import Button from "../components/ui/atoms/Button";
import Image from "../components/ui/atoms/Image";
import Paragraph from "../components/ui/atoms/text/Paragraph";
import Title from "../components/ui/atoms/text/Title";
import { GetToken, RemoveToken } from "../service/auth/TokenStorage";
import HandlerIco from "../service/ui/HandlerIco";
import { BsAward } from "react-icons/bs";

const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <header className="">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="mask p-2">
                <Image alt="" customClass="" h={50} w={50} src="/logo.png" />
              </div>
              <Title text="nutringest" customClass="font-black" size="3xl" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-base-content hover:text-primary transition-colors">Características</a>
              <a href="#benefits" className="text-base-content hover:text-primary transition-colors">Beneficios</a>
              <a href="#pricing" className="text-base-content hover:text-primary transition-colors">Precios</a>
              <a href="#team" className="text-base-content hover:text-primary transition-colors">Equipo</a>
            </div>
            {
              GetToken()
                ? <div className="flex gap-2">
                  <Button
                    url="/dashboard"
                    variant="border"
                    color="success"
                    text="Inicio"
                    ico={<HandlerIco ico="dashboard" />}
                    size="md"
                  />
                  <Button
                    click={() => { RemoveToken(); window.location.reload() }}
                    variant="border"
                    color="error"
                    text="salir"
                    ico={<HandlerIco ico="x" />}
                    size="md"
                  />
                </div>
                : <Button
                  variant="border"
                  color="success"
                  text="Demo"
                  ico={<HandlerIco ico="success" />}
                  size="md"
                />

            }
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold text-base-content mb-6 leading-tight animate-fade-in">
                Tu Software Ideal para
                <span className="text-primary"> Nutricionistas</span>
              </h1>
              <Paragraph
                text="Optimiza tu práctica profesional con la herramienta más completa para gestionar pacientes, planes nutricionales y seguimiento clínico."
                customClass="text-xl text-base-content/70 mb-8"
              />
              <div className="flex space-x-4">
                <Button
                  url="/login"
                  color="primary"
                  text="Empezar ahora"
                  ico={<HandlerIco ico="success" />}
                />
                <Button
                  url="/register"
                  variant="border"
                  color="success"
                  text="Crear cuenta"
                  ico={<HandlerIco ico="success" />}
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
                alt="Nutricionista trabajando"
                className="rounded-2xl shadow-2xl animate-float mask mask-squircle"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-base-content mb-4">Características Principales</h2>
            <p className="text-xl text-base-content/70">Todo lo que necesitas en un solo lugar</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
                title: "Gestión de Pacientes",
                description: "Administra perfiles, historiales y seguimiento de manera eficiente"
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3zM8 10h8M8 14h8M8 18h8" />
                  </svg>
                ),
                title: "Gestión de Menús",
                description: "Crea y personaliza planes nutricionales adaptados a cada paciente"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:-translate-y-1"
              >
                <div className="card-body items-center text-center">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="card-title text-base-content">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Beneficios Nutringest"
                className="rounded-2xl shadow-lg mask mask-squircle"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-4xl font-bold text-base-content mb-8">¿Por qué elegir Nutringest?</h2>
              {[
                // "App móvil intuitiva para ti y tus pacientes",
                "Respaldo automático y seguro de toda tu información",
                // "Plantillas profesionales personalizables",
                "Seguimiento detallado del progreso de pacientes",
                "Gestión de menus",
                "Gestión de listas de intercambio",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center mb-6">
                  <div className="badge badge-primary p-3 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-lg text-base-content">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Planes Adaptados a tus Necesidades</h2>
            <p className="text-xl text-base-content/70">Elige el plan que mejor se ajuste a tu práctica profesional</p>
          </div>

          <div className="flex gap-8 justify-center items-center">
            {[
              {
                name: "Pre Venta",
                price: "15",
                features: [
                  "Gestión de hasta 100 pacientes",
                  "App móvil para pacientes",
                  "Planes nutricionales básicos",
                  "Seguimiento de progreso",
                ],
                highlighted: true
              },
              {
                name: "Profesional",
                price: "25",
                features: [
                  "Gestión de hasta 100 pacientes",
                  "App móvil para pacientes",
                  "Planes nutricionales básicos",
                  "Seguimiento de progreso",
                ]
              },
              // {
              //   name: "Avanzado",
              //   price: "35",
              //   features: [
              //     "Gestión ilimitada de pacientes",
              //     "App móvil para pacientes y nutricionista",
              //     "Seguimiento detallado",
              //     "Reportes personalizados",
              //   ],
              //   highlighted: true
              // },
              // {
              //   name: "Clínicas",
              //   price: "80",
              //   features: [
              //     "Múltiples nutricionistas",
              //     "Gestión de clínica completa",
              //     "Panel de administración",
              //     "Reportes personalizados"
              //   ]
              // }
            ].map((plan, index) => (
              <div
                key={index}
                className={`card ${plan.highlighted
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-2xl scale-105'
                  : 'bg-base-100 shadow-xl'
                  }`}
              >
                <div className="card-body">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-base-content'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline my-8">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-xl">/mes</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${plan.highlighted ? 'text-white' : 'text-primary'} mr-3`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span className={plan.highlighted ? 'text-white' : 'text-base-content/70'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions justify-center">
                    <button
                      className={`btn btn-block ${plan.highlighted
                        ? 'btn-base-300'
                        : 'btn-primary'
                        }`}
                    >
                      Comenzar ahora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">La Mente Detrás del Proyecto</h2>
            <p className="text-lg dark:text-gray-400 text-gray-700">Experto en nutrición y bienestar integral</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                alt="Winder González"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Winder González</h3>
              <h4 className="text-xl text-green-600 mb-6">Nutricionista y Dietista</h4>

              <p className="dark:text-gray-400 text-gray-700 mb-8">
                Con más de una década de experiencia en nutrición y dietética, Winder González ha dedicado su carrera a
                promover hábitos alimenticios saludables y sostenibles. Su enfoque integral combina la ciencia nutricional
                moderna con prácticas alimentarias tradicionales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 shadow-lg shadow-base-300 rounded-lg">
                  <BsAward className="w-8 h-8 text-green-600 mb-2" />
                  <h5 className="font-semibold text-gray-800 dark:text-gray-100">Certificado</h5>
                  <p className="text-sm dark:text-gray-400 text-gray-700 text-center">Lic Nutricón</p>
                </div>

                <div className="flex flex-col items-center p-4 shadow-lg shadow-base-300 rounded-lg">
                  <FaBookOpen className="w-8 h-8 text-green-600 mb-2" />
                  <h5 className="font-semibold text-gray-800 dark:text-gray-100">Investigador</h5>
                  <p className="text-sm dark:text-gray-400 text-gray-700 text-center">Alimentación Saludable</p>
                </div>

                <div className="flex flex-col items-center p-4 shadow-lg shadow-base-300 rounded-lg">
                  <FaUserSecret className="w-8 h-8 text-green-600 mb-2" />
                  <h5 className="font-semibold text-gray-800 dark:text-gray-100">Consultor</h5>
                  <p className="text-sm dark:text-gray-400 text-gray-700 text-center">Restaurantes Saludables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to- py-20">
        <div className="container mx-auto px-6 text-center flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Comienza tu prueba gratuita hoy
          </h2>
          <p className="text-white text-xl mb-8">
            14 días gratis, sin compromiso. Descubre cómo Nutringest puede transformar tu práctica profesional.
          </p>
          <Button
            variant="border"
            color="success"
            text="Empezar prueba gratuita"
            size="lg"
            ico={<HandlerIco ico="secure" />}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="mask mask-squircle">
                  <Image alt="" customClass="" h={50} w={50} src="/logo.png" />
                </div>
                <span className="text-2xl font-bold">Nutringest</span>
              </div>
              <p className="text-base-content text-opacity-60 max-w-sm">
                Transformando la práctica nutricional con tecnología innovadora.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-lg font-semibold mb-4">Producto</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Características</a></li>
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Precios</a></li>
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Empresa</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Sobre nosotros</a></li>
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Blog</a></li>
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Privacidad</a></li>
                  <li><a href="#" className="text-base-content text-opacity-60 hover:text-primary">Términos</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-base-content border-opacity-10 mt-12 pt-8 text-center text-base-content text-opacity-60">
            <p>&copy; 2025 Nutringest. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;