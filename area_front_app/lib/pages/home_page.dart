import 'package:flutter/material.dart';
import 'package:area_front_app/components/bottom_navigation_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: const Center(
        child: Text('Home Page'),
      ),
      bottomNavigationBar: const CustomBottomNavigationBar(),
    );
  }
}
