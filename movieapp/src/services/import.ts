import DocumentPicker from 'react-native-document-picker';



class ImportService {
  static async importFromFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText],
      });
      const data = new FormData();
      data.append('movies', res);
      return data;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        return null;
      } else {
        throw err;
      }
    }
  }

}

export default ImportService;
