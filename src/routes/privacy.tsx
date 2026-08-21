import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    title: 'Privacidade e Segurança | Hubvision',
    meta: [
      { name: 'description', content: 'Política de Privacidade e Segurança de Dados da Hubvision.' },
      { property: 'og:title', content: 'Privacidade e Segurança | Hubvision' },
      { property: 'og:description', content: 'Saiba como protegemos seus dados na Hubvision.' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#020817] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-hv-blue-electric hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className="font-bold">Voltar para o site</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-space-grotesk">
            Privacidade e Segurança
          </h1>
          <p className="text-hv-text-muted mb-12">
            Última atualização: 21 de agosto de 2026
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Eye className="text-hv-blue-electric mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">Transparência</h3>
              <p className="text-hv-text-muted text-sm text-balance">Processos claros sobre coleta e uso de dados.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Lock className="text-hv-blue-electric mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">Proteção</h3>
              <p className="text-hv-text-muted text-sm text-balance">Criptografia de ponta a ponta em todas as camadas.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <Shield className="text-hv-blue-electric mb-4" size={32} />
              <h3 className="text-white font-bold mb-2">Conformidade</h3>
              <p className="text-hv-text-muted text-sm text-balance">Alinhado com as melhores práticas de LGPD e segurança.</p>
            </div>
          </div>

          <div className="space-y-8 text-hv-text-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Coleta de Informações</h2>
              <p>
                Coletamos informações necessárias para fornecer nossos serviços de tecnologia, como dados de contato empresarial, informações técnicas de integração e dados de uso da plataforma para melhoria contínua da experiência do usuário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Uso de Dados</h2>
              <p>
                Os dados coletados são utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Prestação e suporte de serviços de consultoria e software;</li>
                <li>Comunicação sobre atualizações, novos recursos e manutenções;</li>
                <li>Garantia da segurança e integridade de nossas soluções;</li>
                <li>Cumprimento de obrigações legais e regulatórias.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Segurança da Informação</h2>
              <p>
                Implementamos medidas técnicas e organizacionais rigorosas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui firewalls, criptografia de dados em repouso e em trânsito, e controles de acesso baseados em funções (RBAC).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Compartilhamento com Terceiros</h2>
              <p>
                A Hubvision não vende dados pessoais. O compartilhamento ocorre apenas com parceiros essenciais para a execução dos serviços (como provedores de Cloud) ou quando exigido por lei, sempre sob contratos de confidencialidade estritos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Seus Direitos (LGPD)</h2>
              <p>
                Em conformidade com a LGPD, garantimos a você o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou inexatos, e solicitar a anonimização ou exclusão de dados desnecessários.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies e Tecnologias de Rastreamento</h2>
              <p>
                Utilizamos cookies técnicos para garantir o funcionamento correto do site e cookies analíticos para entender como os visitantes interagem com nosso conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contato de Privacidade</h2>
              <p>
                Para qualquer dúvida sobre esta política ou sobre como tratamos seus dados, entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <strong>privacy@hubvision.tech</strong>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
