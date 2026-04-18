import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants';
import { useAuthStore } from '../../store/useAuthStore';
import { usePetitionStore } from '../../store/usePetitionStore';

const AuthGuard = ({ onLogin, onRegister }: any) => (
  <View style={guardStyles.container}>
    <View style={guardStyles.iconWrap}>
      <MaterialIcons name="person-outline" size={48} color={COLORS.primary} />
    </View>
    <Text style={guardStyles.title}>VoiceUp</Text>
    <Text style={guardStyles.subtitle}>Log in to view your civic profile, track your impact, and manage your petitions.</Text>
    
    <TouchableOpacity style={guardStyles.btnPrimary} onPress={onLogin}>
      <Text style={guardStyles.btnPrimaryText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity style={guardStyles.btnSecondary} onPress={onRegister}>
      <Text style={guardStyles.btnSecondaryText}>Create an Account</Text>
    </TouchableOpacity>
  </View>
);

const guardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: COLORS.surface,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.onSurface,
    marginBottom: 16,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
  btnPrimary: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  btnSecondary: {
    paddingVertical: 16,
  },
  btnSecondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  }
});

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();
  const { petitions } = usePetitionStore();
  
  const [activeTab, setActiveTab] = useState<'my_petitions' | 'signed'>('my_petitions');

  if (!user) {
    return (
      <AuthGuard 
        onLogin={() => navigation.navigate('Login', { returnTo: 'ProfileTab' })} 
        onRegister={() => navigation.navigate('Register', { returnTo: 'ProfileTab' })} 
      />
    );
  }

  const myPetitions = petitions.filter(p => p.authorId === user.id);
  // Mock signed petitions for UI display
  const signedPetitions = petitions.slice(0, 1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <View style={styles.avatarMiniWrap}>
            <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCucXxnuDgFfSk7jZm313BAkF1O3E5pm26ImkRMAevMhJTeTTLztue-Y5nqa4rtYqKBJfp6l2BC1vz9anF_PrGdv_nnv29tp-WUwhWx3U3N1eHRrwhVd70Ig6-dflophiVoKpQ-4UFaoscCTh9ppAX-0XBML7pZteKW7AdVT2FcYrxFB3IoNOiQPwrzDxvnNrFxBQhXKvuwxSuos42nnDvowESEMS17VFRY0PiEi30s995ZIN7HwXtGUeDAsR4NclTwXZvtNRp3Xz1w'}} style={styles.avatarImg} />
          </View>
          <Text style={styles.appBarTitle}>VoiceUp</Text>
        </View>
        <View style={styles.appBarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="notifications" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout(); navigation.navigate('HomeTab'); }}>
            <MaterialIcons name="logout" size={20} color={COLORS.secondary} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroLayout}>
            <View style={styles.avatarLargeWrap}>
              <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZqLKINCgRok7E9QnYQMO-NetLoVot7YJ82Z_599vPCeJ_691WBG9-vydQfb1PEW-e7sy9E2SItn_Vdejx4AypOocQ6NY-RoI8dEX79llrw6Yih7p8DF3t1puGjw5g0EI8f9U4osqT0aXhzyiJRW4G3dDvLyyk9ry7DTWzxR_cRDEcSBU7OIxv0CeKz1xLaXPrnLZ_aKBwD14imrbPoLJTrUzUW-wuGk72XnhPK7FC08crUYEoxlGwbW5BuFOBlEEPRtqqf_g3YqR6'}} style={styles.avatarLargeImg} />
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={16} color="#fff" />
              </View>
            </View>

            <View style={styles.heroInfo}>
              <Text style={styles.verifiedTag}>VERIFIED ADVOCATE</Text>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userBio}>Dedicated to urban sustainability and community-driven policy reform. Member since 2022.</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{myPetitions.length}</Text>
              <Text style={styles.statLabel}>CREATED</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>84</Text>
              <Text style={styles.statLabel}>SIGNED</Text>
            </View>
          </View>
        </View>

        {/* Tab System */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab('my_petitions')} style={styles.tabBtn}>
            <Text style={[styles.tabText, activeTab === 'my_petitions' && styles.activeTabText]}>My Petitions</Text>
            {activeTab === 'my_petitions' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('signed')} style={styles.tabBtn}>
            <Text style={[styles.tabText, activeTab === 'signed' && styles.activeTabText]}>Signed</Text>
            {activeTab === 'signed' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        {activeTab === 'my_petitions' && (
          <View style={styles.grid}>
            {myPetitions.length > 0 ? myPetitions.map(petition => (
              <TouchableOpacity key={petition.id} style={styles.petitionCard} onPress={() => navigation.navigate('PetitionDetails', { id: petition.id })}>
                 <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9AJnFp93hNLSvk6sbH2HBt8bN3sWiW1jSG3PgsQ8ko0vby8f5v45qj1_Eyk3gm1sLbBLP_ghTw1vH3D_wKXDMPQbARvb3321Q8osgSzg2hqIOJX8RL5sDjmpvDbCmIDtQMyzc03Evgb5HjWJRQPy6a7CZ6BVH_IKapChsBbP4H_21b94jgE2NDicI2wbJJQPAiMmLukokmCaROapV7f5G1Hx80znF2vzZ4TC9Mipt4nE28I0WfIYNeX7Xs0FfcZ6ncf2WeB-PkWRJ'}} style={styles.cardImage} />
                 <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{petition.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>{petition.description}</Text>
                    
                    <View style={styles.progressBg}>
                      <View style={[styles.progressFill, { width: `${(petition.signatureCount / petition.goal) * 100}%` }]} />
                    </View>
                    <View style={styles.progressRow}>
                      <Text style={styles.cardProgressText}>{petition.signatureCount.toLocaleString()} SIGNATURES</Text>
                      <Text style={styles.cardProgressGoal}>GOAL: {petition.goal.toLocaleString()}</Text>
                    </View>
                 </View>
              </TouchableOpacity>
            )) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No Petitions Yet</Text>
                <Text style={styles.emptyDesc}>You haven't launched any petitions. Your voice is needed!</Text>
                <TouchableOpacity style={styles.createBtn} onPress={() => navigation.navigate('CreateTab')}>
                  <Text style={styles.createBtnText}>Create Petition</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Impact Score Bento */}
        <View style={styles.impactCard}>
          <View style={styles.impactContent}>
             <MaterialIcons name="auto-awesome" size={32} color="#fff" style={{marginBottom: 16}} />
             <Text style={styles.impactTitle}>Impact Score</Text>
             <Text style={styles.impactDesc}>Your voice has reached 142,000 people this month.</Text>
          </View>
          <Text style={styles.impactScore}>A+</Text>
          <View style={styles.impactGlow} />
        </View>

        <View style={{height: 120}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarMiniWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0, 74, 198, 0.1)',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primaryContainer,
    letterSpacing: -0.5,
  },
  appBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(188, 0, 6, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  logoutText: {
    color: '#bc0006',
    fontWeight: '700',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  heroSection: {
    marginBottom: 48,
  },
  heroLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarLargeWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 10,
    marginBottom: 24,
    position: 'relative',
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  avatarLargeImg: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  heroInfo: {
    alignItems: 'center',
  },
  verifiedTag: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 8,
  },
  userName: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.onSurface,
    letterSpacing: -1,
    marginBottom: 12,
  },
  userBio: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  statBox: {
    backgroundColor: '#eff4ff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabBtn: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    position: 'relative',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    fontWeight: '800',
    color: COLORS.onSurface,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  grid: {
    marginBottom: 48,
  },
  petitionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.onSurface,
    lineHeight: 28,
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  progressBg: {
    height: 10,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardProgressText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.onSurface,
    letterSpacing: 0.5,
  },
  cardProgressGoal: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  emptyDesc: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  createBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  impactCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 32,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impactContent: {
    flex: 1,
    zIndex: 10,
  },
  impactTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  impactDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    paddingRight: 16,
  },
  impactScore: {
    fontSize: 64,
    fontWeight: '900',
    color: '#fff',
    zIndex: 10,
  },
  impactGlow: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  }
});
