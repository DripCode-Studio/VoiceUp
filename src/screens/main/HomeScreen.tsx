import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOXPN2Po219NrnOrneqwLWH868iwi6OIyMRn4j-r1JN9OnwxFEO30hw2Qe1o6LW8Fk7and17dGDvdb6NPR8vsLB_8i3xWaxN761xNxd9ojXd_HUWMJ9kMNQJyPaFhWnagfvh6spI8OnGb75PbvLQxsdAqub7SAcq6v6O4zflbF_IfN2N25i7YuRomMpIb_5sPZKjkuEws3bN270gVQ0PIERKZi3mjK9dDERG0zEBWcYuD5GN-SHykmqP9nJUEeNohcWTdh8rsH6g_o' }} 
            style={styles.avatar} 
          />
          <Text style={styles.brandTitle}>VoiceUp</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <MaterialIcons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Editorial Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Sovereignty of the{"\n"}<Text style={styles.heroTitleAccent}>Collective Voice.</Text></Text>
          <Text style={styles.heroSubtitle}>
            Every signature is a testament to shared resolve. We elevate grassroots movements into institutional mandates through the power of intentional advocacy.
          </Text>
        </View>

        {/* Trending Petitions Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionOverline}>Curation</Text>
            <Text style={styles.sectionTitle}>Trending Petitions</Text>
          </View>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={styles.viewAllText}>View all campaigns</Text>
            <MaterialIcons name="arrow-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Bento Grid layout */}
        {/* Large Featured Card */}
        <TouchableOpacity 
          style={styles.largeCardWrap} 
          activeOpacity={0.95} 
          onPress={() => navigation.navigate('PetitionDetails', { id: '1' })}
        >
          <View style={styles.largeCardInner}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANuNiyI07h-RMf_bz_-OKjOUZHtDNtftm_Gp5Hr_mtDsbFo6xE2FPSOmcmLmQqgNozicfAbrI_sNIz092L_5IJA8l-BO0Sg591vE_Hu2iTPhRGhUJFuSb-iWMsxHXyEACPAWHqKY2dC-83lr6pG2x365cQ78e6H_az78EM4On5TtGZw7yhFQP_OuAb3_wnMEWUty8fT3cRvzpvjfgtUODnUxt_MZdJap5rIceGOubr0MFWxwom0eRLojoMM71qo1JxOkyKtpt4sxYI' }} 
              style={styles.featuredImage}
            />
            <View style={styles.chipRow}>
              <View style={styles.chip}><Text style={styles.chipText}>ENVIRONMENT</Text></View>
              <Text style={styles.statText}>• 12k people signed</Text>
            </View>
            <Text style={styles.cardTitle}>Protect the Remaining Old Growth Forests in the Northern Sector</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              The proposed logging expansion threatens an ecosystem that has stood for over 400 years. We demand immediate heritage status designation.
            </Text>
            
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressCurrent}>85,240 signatures</Text>
                <Text style={styles.progressGoal}>Goal: 100,000</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '85%' }]} />
              </View>
            </View>

            <View style={styles.authorRow}>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjkQbRupTopLoybuayUxyWLQzOdr6EtLVMkLieU98Gr81fsD4gx5RrJSTiOzEgaixMqec4DGut0L7bDlo2xNCUHGso46ZCXJ2UhamXPF-lQLK1GLgzmB3b6JgxZMUWYDrPlosBrYxriSh3sW1pZ6jTeXiBBhHZZZ1wGwaEA6Pqhk4yqq1bod8QxJtVuCFSTeDH9jJDlLhkAzxAcjebIz02xsewZk0BxrmfaVFh1XD2016sBJEDwFpVd9gUiXQE13NJZebV_idp3I8e' }} style={styles.authorAvatar} />
              <Text style={styles.authorText}>Started by <Text style={{fontWeight: '700'}}>Elias Jorgen</Text></Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Small Cards */}
        <View style={styles.smallCardsContainer}>
          <TouchableOpacity style={styles.smallCardWrap} activeOpacity={0.95}>
            <View style={styles.smallCardInner}>
              <Text style={styles.smallCardTitle}>Universal Access to Mental Healthcare in Public Schools</Text>
              <Text style={styles.smallCardDesc} numberOfLines={2}>Integrating licensed therapists into every primary and secondary campus nationwide.</Text>
              <View style={styles.smallCardBottom}>
                <View style={styles.progressBarBgSm}>
                  <View style={[styles.progressBarFill, { width: '42%' }]} />
                </View>
                <View style={styles.progressHeader}>
                  <Text style={styles.smallProgressText}>4.2K SIGNED</Text>
                  <Text style={styles.smallProgressText}>GOAL 10K</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCardWrap} activeOpacity={0.95}>
            <View style={styles.smallCardInner}>
              <Text style={styles.smallCardTitle}>Mandatory Urban Green Space in All New Developments</Text>
              <Text style={styles.smallCardDesc} numberOfLines={2}>Proposing a law requiring 20% of urban construction plots to be dedicated public parks.</Text>
              <View style={styles.smallCardBottom}>
                <View style={styles.progressBarBgSm}>
                  <View style={[styles.progressBarFill, { width: '71%' }]} />
                </View>
                <View style={styles.progressHeader}>
                  <Text style={styles.smallProgressText}>17.8K SIGNED</Text>
                  <Text style={styles.smallProgressText}>GOAL 25K</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Signature Milestone Alert */}
        <View style={styles.alertCard}>
          <View style={styles.alertCardContent}>
            <Text style={styles.alertTitle}>The 100k Milestone</Text>
            <Text style={styles.alertDesc}>Three of our community led petitions reached the National Senate review board this morning. Your signature carries the weight of change.</Text>
            <TouchableOpacity style={styles.alertBtn}>
              <Text style={styles.alertBtnText}>See the Victories</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacer for safe area regarding bottom nav */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* FAB - Floating Action Button for Create */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CreateTab')}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.02)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primaryContainer,
    letterSpacing: -0.5,
  },
  notificationBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  heroSection: {
    marginBottom: 64,
  },
  heroTitle: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '900',
    color: COLORS.onSurface,
    letterSpacing: -1,
    marginBottom: 24,
  },
  heroTitleAccent: {
    color: '#004ac6',
    fontStyle: 'italic',
  },
  heroSubtitle: {
    fontSize: 17,
    fontWeight: '300',
    lineHeight: 28,
    color: '#434655',
    marginLeft: '12%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  sectionOverline: {
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 2,
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  largeCardWrap: {
    backgroundColor: '#eff4ff',
    borderRadius: 32,
    padding: 4,
    marginBottom: 32,
  },
  largeCardInner: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
  },
  featuredImage: {
    width: '100%',
    aspectRatio: 16/7,
    borderRadius: 16,
    marginBottom: 24,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: 'rgba(0, 74, 198, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  chipText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressCurrent: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  progressGoal: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  progressBarBg: {
    height: 16,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarBgSm: {
    height: 6,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  authorText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  smallCardsContainer: {
    gap: 24,
    marginBottom: 64,
  },
  smallCardWrap: {
    backgroundColor: '#eff4ff',
    borderRadius: 32,
    padding: 4,
  },
  smallCardInner: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 24,
  },
  smallCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  smallCardDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
  },
  smallCardBottom: {
    marginTop: 16,
  },
  smallProgressText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },
  alertCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 48,
    padding: 40,
    overflow: 'hidden',
    marginBottom: 48,
  },
  alertCardContent: {
    zIndex: 10,
  },
  alertTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  alertDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  alertBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  alertBtnText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  }
});
