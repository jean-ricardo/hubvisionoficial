import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    title: 'Termos de Uso | Hubvision',
    meta: [
      { name: 'description', content: 'Termos de uso e condições para utilização dos serviços e site da Hubvision.' },
      { property: 'og:title', content: 'Termos de Uso | Hubvision' },
      { property: 'og:description', content: 'Leia os termos e condições da Hubvision.' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#020817] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-space-grotesk">
            Termos de Uso
          </h1>
          <p className="text-hv-text-muted mb-12">
            Última atualização: 21 de agosto de 2026
          </p>

          <div className="space-y-8 text-hv-text-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o site da Hubvision, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site ou serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Descrição dos Serviços</h2>
              <p>
                A Hubvision é uma empresa de tecnologia especializada em consultoria Cloud, integrações TOTVS, inteligência artificial e soluções de automação empresarial. O site serve como uma plataforma informativa sobre nossos produtos (HUBOT, HoraPoint, Régua de Cobrança) e serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é de propriedade da Hubvision ou de seus fornecedores de conteúdo e é protegido por leis internacionais de direitos autorais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Uso da Licença</h2>
              <p>
                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site da Hubvision, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitação de Responsabilidade</h2>
              <p>
                Em nenhum caso a Hubvision ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no site da Hubvision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Precisão dos Materiais</h2>
              <p>
                Os materiais exibidos no site da Hubvision podem incluir erros técnicos, tipográficos ou fotográficos. A Hubvision não garante que qualquer material em seu site seja preciso, completo ou atual. A Hubvision pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Links</h2>
              <p>
                A Hubvision não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso pela Hubvision do site. O uso de qualquer site vinculado é por conta e risco do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificações</h2>
              <p>
                A Hubvision pode revisar estes termos de uso do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de uso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Lei Aplicável</h2>
              <p>
                Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
