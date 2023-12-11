import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/pages/home/profile_page.dart';

void main() {
  testWidgets('ProfilePage should render correctly', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(
      home: ProfilePage(),
    ));
    expect(find.text('Profile'), findsOneWidget);
    expect(find.text('Profile Page Content'), findsOneWidget);
  });
}
