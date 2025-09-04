import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { OrderDetail } from "../../../../domain/entities/OrderDetail";
type TicketPDFProps = {
  items: OrderDetail[];
  idOrder: number | null;
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    // marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    display: "flex",
    width: "auto",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    padding: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
});

export const TicketPDF = ({ items, idOrder }: TicketPDFProps) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Encabezado con logo + texto */}
      <View style={styles.headerContainer}>
        <Image src="/FarmaCosto_Logotipo-04.png" style={styles.logo} />
        {/* 👆 pon aquí la ruta de tu logo (puede ser /public/logo.png en Next.js o URL) */}
        {/* <Text style={styles.headerText}>CostoFarma</Text> */}
      </View>
      <Text style={styles.header}>Ticket de Orden {idOrder}</Text>
      <View style={styles.table}>
        {/* Encabezados */}
        <View style={styles.row}>
          <Text style={styles.cell}>EAN</Text>
          <Text style={styles.cell}>Descripción</Text>
          <Text style={styles.cell}>Cantidad</Text>
          <Text style={styles.cell}>Precio</Text>
          <Text style={styles.cell}>Total</Text>
        </View>

        {/* Filas dinámicas */}
        {items.map((item) => (
          <View style={styles.row} key={item.idOrdenDetalle}>
            <Text style={styles.cell}>{item.ean}</Text>
            <Text style={styles.cell}>{item.descripcion}</Text>
            <Text style={styles.cell}>{item.cantidad}</Text>
            <Text style={styles.cell}>${item.precio.toFixed(2)}</Text>
            <Text style={styles.cell}>
              ${(item.precio * item.cantidad).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      {/* Total */}
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <Text style={{ flex: 1, textAlign: "right", fontWeight: "bold" }}>
          Total: $
          {items.reduce((sum, i) => sum + i.precio * i.cantidad, 0).toFixed(2)}
        </Text>
      </View>
      {/* Pie de página */}
      <Text style={styles.footer}>
        Si requiere factura, favor de mandar un correo a info@costofarma.mx con
        su número de orden y sus datos fiscales.
      </Text>
    </Page>
  </Document>
);
