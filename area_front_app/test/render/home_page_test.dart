import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/pages/home_page.dart';
import 'package:area_front_app/components/bottom_navigation_bar.dart';

void main() {
  testWidgets('HomePage should render correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: HomePage(),
    ));

    expect(find.descendant(
      of: find.byType(AppBar),
      matching: find.text('Home'),
    ), findsOneWidget);

    expect(find.text('Home Page'), findsOneWidget);
    expect(find.byType(CustomBottomNavigationBar), findsOneWidget);
  });
}
