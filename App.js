import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleScanReceipt = async () => {
    const dummyImage = 'base64_encoded_dummy_receipt_image';

    try {
      const response = await axios.post('http://localhost:8000/scan-receipt/', {
        image: dummyImage,
      });

      setItems(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      alert('Error scanning receipt. Please try again.');
    }
  };

  const handleSplitBill = () => {
    const numPeople = 2;
    const splitAmount = (total / numPeople).toFixed(2);
    alert(`Each person's share: $${splitAmount}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bill Splitter</Text>
      <Button title="Scan Receipt" onPress={handleScanReceipt} />

      <View style={styles.receiptContainer}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Text style={styles.itemText}>{item.name}: ${item.price}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.totalText}>Total: ${total}</Text>
      </View>

      {total > 0 && (
        <Button title="Split Bill Equally" onPress={handleSplitBill} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  receiptContainer: {
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});