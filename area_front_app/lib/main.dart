import 'package:flutter/material.dart';
import 'package:area_front_app/pages/auth/login_page.dart';
import 'package:area_front_app/pages/auth/register_page.dart';
import 'package:area_front_app/pages/home_page.dart';
import 'package:area_front_app/pages/splash_page.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';


void main() async {
  await dotenv.load(fileName: ".env");
  if (dotenv.env['BASE_URL'] == null) {
    throw Exception('BASE_URL is not defined');
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Area',
      debugShowCheckedModeBanner: false,
      initialRoute: '/splash',
      onGenerateRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) {
            switch (settings.name) {
              case '/splash':
                return const SplashPage();
              case '/login':
                return const LoginPage();
              case '/register':
                return const RegisterPage();
              case '/home':
                return const HomePage();
              default:
                return const LoginPage();
            }
          },
        );
      },
    );
  }
}
