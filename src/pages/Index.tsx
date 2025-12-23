import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Shield, Clock, Users, ArrowLeft, CheckCircle } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="relative container px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground animate-fade-up">
            <div className="w-20 h-20 rounded-3xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mx-auto mb-8 animate-float">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              نظام التأشيرة الإلكترونية
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 leading-relaxed">
              خدمة إلكترونية متكاملة لتقديم ومتابعة طلبات التأشيرات بكل سهولة وأمان
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                user.isAdmin ? (
                  <Link to="/admin">
                    <Button variant="glass" size="xl" className="w-full sm:w-auto gap-2">
                      الدخول للوحة التحكم
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/apply">
                      <Button variant="glass" size="xl" className="w-full sm:w-auto gap-2">
                        تقديم طلب جديد
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/status">
                      <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                        متابعة الطلب
                      </Button>
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="glass" size="xl" className="w-full sm:w-auto gap-2">
                      ابدأ الآن
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                      تسجيل الدخول
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 100V50C240 16.67 480 0 720 0C960 0 1200 16.67 1440 50V100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">مميزات النظام</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نقدم لك تجربة سلسة وآمنة لإدارة طلبات التأشيرات الإلكترونية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: 'تقديم إلكتروني',
                description: 'قدم طلبك من أي مكان وفي أي وقت بخطوات بسيطة'
              },
              {
                icon: Clock,
                title: 'معالجة سريعة',
                description: 'نضمن لك سرعة في مراجعة ومعالجة طلبك'
              },
              {
                icon: Shield,
                title: 'أمان وخصوصية',
                description: 'بياناتك محمية بأعلى معايير الأمان والتشفير'
              },
              {
                icon: Users,
                title: 'دعم متواصل',
                description: 'فريق دعم جاهز لمساعدتك على مدار الساعة'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 shadow-md">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">خطوات التقديم</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اتبع هذه الخطوات البسيطة للحصول على تأشيرتك
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '١', title: 'إنشاء حساب', description: 'سجل بياناتك الأساسية للبدء' },
                { step: '٢', title: 'تقديم الطلب', description: 'أدخل بيانات جواز السفر' },
                { step: '٣', title: 'استلام التأشيرة', description: 'احصل على الموافقة' }
              ].map((item, index) => (
                <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground shadow-elegant">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-elegant border border-border p-8 md:p-12 text-center animate-fade-up">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              قدم طلب تأشيرتك الآن واستفد من خدماتنا الإلكترونية السريعة والآمنة
            </p>
            <Link to={user ? '/apply' : '/auth'}>
              <Button variant="hero" size="xl" className="gap-2">
                {user ? 'تقديم طلب الآن' : 'سجل الآن مجاناً'}
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">نظام التأشيرة الإلكترونية</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
