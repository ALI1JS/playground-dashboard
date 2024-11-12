import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FaUser, FaUsers, FaFutbol, FaClipboardList } from 'react-icons/fa'; // Importing icons from react-icons

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f6f6f6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: '1px solid #e1e1e1',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#2980b9',
  },
  sectionIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#34495e',
  },
  subItem: {
    marginLeft: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },
});

// TypeScript interfaces
interface PlayerData {
  activePlayersCount: number;
  approvedPlayersCount: number;
  femalePlayersCount: number;
  malePlayersCount: number;
  pendingPlayersCount: number;
  playersCount: number;
  totalPlayers: number;
  unActivePlayersCount: number;
}

interface OwnerData {
  approvedOwnersCount: number;
  ownersCount: number;
  ownersHaveStdiumsCount: number;
  ownersNotHaveStdiumsCount: number;
  pendingOwnersCount: number;
  totalOwners: number;
}

interface Category {
  categoryId: number;
  categoryNameEn: string;
}

interface StadiumData {
  totalStadiums: number;
  activeStadiumsCount: number;
  unActiveStadiumsCount: number;
  approvedStadiumsCount: number;
  bothGenderStdiumsCount: number;
  femaleStdiumsCount: number;
  maleStdiumsCount: number;
  pendingStadiumsCount: number;
  stadiumsCount: number;
  categories: Category[];
}

interface ReservationData {
  gamesCount: number;
  gamesPrice: number;
  reservationsCount: number;
  reservationsPrice: number;
}

interface ReportData {
  players?: PlayerData | null;
  owners?: OwnerData | null;
  stadiums?: StadiumData | null;
  reservations?: ReservationData | null;
}

// ReportDocument component
const ReportDocument: React.FC<{ reportData: ReportData; reportType: string }> = ({ reportData, reportType }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`}</Text>

      {reportData.players && (
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <FaUsers size={20} style={styles.sectionIcon} />
            <Text>Players</Text>
          </View>
          <Text style={styles.item}>Total Players: {reportData.players.totalPlayers}</Text>
          <Text style={styles.item}>Active Players: {reportData.players.activePlayersCount}</Text>
          <Text style={styles.item}>Inactive Players: {reportData.players.unActivePlayersCount}</Text>
          <Text style={styles.item}>Approved Players: {reportData.players.approvedPlayersCount}</Text>
          <Text style={styles.item}>Pending Players: {reportData.players.pendingPlayersCount}</Text>
          <Text style={styles.item}>Male Players: {reportData.players.malePlayersCount}</Text>
          <Text style={styles.item}>Female Players: {reportData.players.femalePlayersCount}</Text>
        </View>
      )}

      {reportData.owners && (
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <FaUser size={20} style={styles.sectionIcon} />
            <Text>Owners</Text>
          </View>
          <Text style={styles.item}>Total Owners: {reportData.owners.totalOwners}</Text>
          <Text style={styles.item}>Approved Owners: {reportData.owners.approvedOwnersCount}</Text>
          <Text style={styles.item}>Owners with Stadiums: {reportData.owners.ownersHaveStdiumsCount}</Text>
          <Text style={styles.item}>Owners without Stadiums: {reportData.owners.ownersNotHaveStdiumsCount}</Text>
          <Text style={styles.item}>Pending Owners: {reportData.owners.pendingOwnersCount}</Text>
        </View>
      )}

      {reportData.stadiums && (
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <FaFutbol size={20} style={styles.sectionIcon} />
            <Text>Stadiums</Text>
          </View>
          <Text style={styles.item}>Total Stadiums: {reportData.stadiums.totalStadiums}</Text>
          <Text style={styles.item}>Approved Stadiums: {reportData.stadiums.approvedStadiumsCount}</Text>
          <Text style={styles.item}>Male Stadiums: {reportData.stadiums.maleStdiumsCount}</Text>
          <Text style={styles.item}>Female Stadiums: {reportData.stadiums.femaleStdiumsCount}</Text>
          <Text style={styles.item}>Both Gender Stadiums: {reportData.stadiums.bothGenderStdiumsCount}</Text>
          <Text style={styles.item}>Pending Stadiums: {reportData.stadiums.pendingStadiumsCount}</Text>
          <Text style={styles.item}>Categories:</Text>
          {reportData.stadiums.categories.map((category) => (
            <Text key={category.categoryId} style={styles.subItem}>
              - {category.categoryNameEn}
            </Text>
          ))}
        </View>
      )}

      {reportData.reservations && (
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <FaClipboardList size={20} style={styles.sectionIcon} />
            <Text>Reservations</Text>
          </View>
          <Text style={styles.item}>Total Reservations: {reportData.reservations.reservationsCount}</Text>
          <Text style={styles.item}>Games Price: {reportData.reservations.gamesPrice}</Text>
          <Text style={styles.item}>Games Count: {reportData.reservations.gamesCount}</Text>
          <Text style={styles.item}>Reservations Price: {reportData.reservations.reservationsPrice}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default ReportDocument;
