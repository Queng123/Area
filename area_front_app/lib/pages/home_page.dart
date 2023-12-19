import 'package:flutter/material.dart';
import 'package:area_front_app/components/bottom_navigation_bar.dart';
import 'package:area_front_app/pages/home/show_oauth2_services_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: OAuth2ServicesPage(),
      bottomNavigationBar: CustomBottomNavigationBar(),
    );
  }
}
