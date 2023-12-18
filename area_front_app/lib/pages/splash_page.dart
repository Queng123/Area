import 'package:flutter/material.dart';
import 'dart:async';
import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:area_front_app/pages/auth/login_page.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(milliseconds: 1500), () {
      Navigator.of(context).pushReplacementNamed('/login');
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Area',
      home: AnimatedSplashScreen(
        splash: Image.asset(
          'lib/images/logo.png',
        ),
        splashIconSize: 400,
        nextScreen: const LoginPage(),
        splashTransition: SplashTransition.scaleTransition,
        backgroundColor: const Color.fromRGBO(224, 224, 224, 1),
      ),
    );
  }
}
