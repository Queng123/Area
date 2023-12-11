import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:area_front_app/components/generic_button.dart';

void main() {
  testWidgets('GenericButton should render correctly', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Material(
          child: GenericButton(
            onTap: () {},
            buttonText: 'Test Button',
          ),
        ),
      ),
    );
    expect(find.byType(GestureDetector), findsOneWidget);
    expect(find.byType(Container), findsOneWidget);
    expect(find.byType(Text), findsOneWidget);
    expect(find.text('Test Button'), findsOneWidget);
    expect(
      tester.widget<Text>(find.text('Test Button')).style?.color,
      equals(Colors.white),
    );
    expect(
      tester.widget<Text>(find.text('Test Button')).style?.fontSize,
      equals(16.0),
    );
    expect(
      tester.widget<Text>(find.text('Test Button')).style?.fontWeight,
      equals(FontWeight.bold),
    );
  });
}
