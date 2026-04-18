import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInput
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants';
import { usePetitionStore } from '../../store/usePetitionStore';
import { useAuthStore } from '../../store/useAuthStore';

const { width } = Dimensions.get('window');

// Fallback LinearGradient simulation for the Hero if the actual library isn't installed
const FallbackHeroGradient = () => (
  <View style={StyleSheet.absoluteFill}>
    <View style={{flex: 1, backgroundColor: 'rgba(18, 28, 42, 0.4)'}} />
    <View style={{flex: 1, backgroundColor: 'rgba(18, 28, 42, 0)'}} />
    <View style={{flex: 1, backgroundColor: 'rgba(18, 28, 42, 0.8)'}} />
  </View>
);

export const PetitionDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params || { id: '1' };
  
  const { user } = useAuthStore();
  const { petitions, signPetition, hasSigned } = usePetitionStore();
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  // Fallback data if id not found
  const petition = petitions.find(p => p.id === id) || {
    id: '1',
    title: 'Save the local park from development',
    description: "Oakwood Commons has been the heart of our community for over fifty years. It's where our children learn to ride bikes, where senior citizens find shade under century-old oaks, and where our local wildlife finds a rare sanctuary within the city limits.\n\nRecent plans submitted to the city council propose replacing 70% of this green space with a high-density luxury residential complex and a multi-level parking garage. While we recognize the need for housing, destroying one of the few remaining public parks is not the solution.\n\nThe development would not only eliminate vital recreation space but also significantly increase local traffic and put immense strain on our local drainage systems. We are calling on the City Planning Commission to reject the current proposal and designate Oakwood Commons as a protected municipal heritage site.",
    authorId: 'user1',
    authorName: 'Sarah Jenkins',
    signatureCount: 12450,
    goal: 15000,
  };

  const isSigned = hasSigned(petition.id);

  const handleSign = () => {
    if (isSigned) return;
    
    if (!user) {
      if (!guestName.trim() || !guestEmail.trim()) {
        alert('Please provide your name and email to sign.');
        return;
      }
      signPetition(petition.id, guestName, guestEmail);
    } else {
      signPetition(petition.id);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Edge-to-Edge Hero Image */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6-hWgtFKk1wO2muYf9GVuTY8TzLF3Z93xnkW3Vo9a_EHBD4ZdmXhtHnA75wRz9F7HLwxTjWERaIQIIroEkqJdGNEeduQAxIatWUG3X-vHFdh91DJztzsQENx1rnf97SrUgX4V4XCCJJhxAJvuuBs9jb7O5S2LRZyeIgc5iKuiB8APJ8HVDJggbRpq__nfs1L1ZXM4VhDmhVEpsxZOJyNG7oog7lybqvr80_UQAoPckTHbmbfNJGHzVQMjRlndFFYxqTCzTQCHoaxX' }} 
            style={styles.heroImage} 
          />
          <FallbackHeroGradient />
          
          <View style={styles.headerNav}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn}>
              <MaterialIcons name="share" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroTextContainer}>
            <View style={styles.activeTag}>
              <Text style={styles.activeTagText}>ACTIVE CAMPAIGN</Text>
            </View>
            <Text style={styles.heroTitle}>{petition.title}</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.bodyContainer}>
          {/* Author Block */}
          <View style={styles.authorBlock}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBymodSHPSAOfYdCX2dy5Oa8hoF4nPbjoGimdlpRTJ5gw5kGMrndVXOWluXA_HfatEFeSkeM8cXYwFzIDhJsmpV7tOn94IGT_mFmoK5yZ7TbS5TkQ-29x-wjnkDKVPRB7RU4O7FGUAmSdJI7EWPC7iiBOrxFjuz63kvh8tFLH7RsOcfsI6WxBJf-BYl_Ama0kRJLfHerDlDZJaF3yXO-jm0e_nUiOvT1ZqzH3eYYLoiZyhXezMPK2g6AxtGiuKpMc2WPxTUkr9sCc6y' }} 
              style={styles.authorAvatar} 
            />
            <View>
              <Text style={styles.authorName}>{petition.authorName}</Text>
              <Text style={styles.authorSub}>Started Oct 24 • <Text style={{color: COLORS.primary, fontWeight: '600'}}>Environmental Justice</Text></Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.descriptionText}>
            {petition.description}
          </Text>

          {/* Demands Bento Box */}
          <View style={styles.demandsBox}>
            <Text style={styles.demandsTitle}>What are we asking for?</Text>
            
            <View style={styles.demandItem}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
              <Text style={styles.demandText}>Immediate suspension of the "Project Greenview" development permit.</Text>
            </View>
            
            <View style={styles.demandItem}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
              <Text style={styles.demandText}>A formal public hearing with community stakeholders.</Text>
            </View>
            
            <View style={styles.demandItem}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
              <Text style={styles.demandText}>Exploration of alternative brownfield sites for the proposed housing project.</Text>
            </View>
          </View>
          
          <View style={{height: 300}} />
        </View>
      </ScrollView>

      {/* Floating Action / Status Footer */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.stickyFooter}
      >
        <View style={styles.footerInner}>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsNumber}>{petition.signatureCount.toLocaleString()}</Text>
              <Text style={styles.statsLabel}>SIGNATURES</Text>
            </View>
            <Text style={styles.statsGoal}>Goal: {petition.goal.toLocaleString()}</Text>
          </View>
          
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${(petition.signatureCount / petition.goal) * 100}%` }]} />
          </View>

          <View style={styles.supportersPreview}>
             <View style={styles.avatarStack}>
               <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOu6Mo35xmiT-q8bswwOKe62N5U2iR5I0PsisHflE-b-DoveOmUU8VEbHiMr3YRfTpxOXZMUDtVGioybzFAGs8B7D8uOiGTmBiQ2ThyslT-C3WfRu0Uu957yAln_McjCGt_JCeBl3kWR2QdlIql5rT8wQ_nkfFyMQAOgVxulMrwDbnp2jeiZ-aDHNhY4QJfwplTfUwNqKAVCXW28Cov6eCKmu7HszSUfZ01zGyEVNdHl3stuFIlzZQzjfYhPB7GqebbzedZeP2URjn'}} style={[styles.stackAvatar, { zIndex: 3 }]}/>
               <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM13bF-TYzYNKeIJHqOk6pm1Wz8VqmKdL-QsdZfAagTtMvG7vC4QH4cW0nFkR_7EKLw6ZUKS-f0zgkwRwA526sa44ktLFwblZq6tF-sHlRbIXoLvX_zpf6Bq5xsMtjchj8tDKMnWnJK6LNNyaKZXfen2EWu3ZpG4C8L5CXEEdBY13HghVJekKaB7TJZ0osHuLKgnm7VwStwoUJxlmtrPf0NLu4TttaUVoUZknsVjPC-cOHdULM04OLv8RlHu_H3bMHVPmdzo-q9W3S'}} style={[styles.stackAvatar, { zIndex: 2, marginLeft: -12 }]}/>
               <Image source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdxdH0nhUBKU3NEpIGG5LmJ-vjdBlZGVSGuLR0_-gTsEUT2rBFfcn_ag18WdNHQL4Kn4MZrdi8hagoZFWiqGEsEILbViCCoizrdWms8c3HyC6IBscyLsPh4jXcQpnrhszQ23lEtKk4s6hq5PvMJEkIUuJ6ZRbumPnZC-sl14yRRjEP41pSFFmGPbKlaL0MrnEjjM0FBBgw1dhiexUfH_Fkt8fT7XBWnu_JV7WgB1Y5aoRt-yvxqNGQ5CRXIYSldDrdLFYP2_vlGzQ_'}} style={[styles.stackAvatar, { zIndex: 1, marginLeft: -12 }]}/>
               <View style={[styles.stackMore, { marginLeft: -12 }]}><Text style={styles.stackMoreText}>+12k</Text></View>
             </View>
             <Text style={styles.quoteText}>
              "This park is where my kids grew up. We can't let it disappear."{"\n"}
              <Text style={{fontWeight: 'bold', color: COLORS.primary}}>— Michael R., 2 hours ago</Text>
             </Text>
          </View>

          {!user && !isSigned && (
            <View style={styles.guestInputs}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={COLORS.outline}
                value={guestName}
                onChangeText={setGuestName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={COLORS.outline}
                value={guestEmail}
                onChangeText={setGuestEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          <TouchableOpacity 
            style={[styles.signBtn, isSigned && styles.signedBtn]}
            activeOpacity={0.9}
            onPress={handleSign}
            disabled={isSigned}
          >
             <Text style={styles.signBtnText}>{isSigned ? 'Petition Signed' : 'Sign this petition'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  heroContainer: {
    width: '100%',
    height: width * 1.2, // Tall edge-to-edge
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerNav: {
    position: 'absolute',
    top: 50,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextContainer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    zIndex: 10,
  },
  activeTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  activeTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 46,
    letterSpacing: -1,
  },
  bodyContainer: {
    padding: 24,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    zIndex: 20,
  },
  authorBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  authorSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  descriptionText: {
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.textSecondary,
    marginBottom: 32,
  },
  demandsBox: {
    backgroundColor: '#eff4ff',
    padding: 32,
    borderRadius: 24,
  },
  demandsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginBottom: 20,
  },
  demandItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  demandText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 20,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    paddingHorizontal: 24,
  },
  footerInner: {
    width: '100%'
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.onSurface,
    lineHeight: 36,
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: COLORS.textSecondary,
  },
  statsGoal: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  progressBg: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  supportersPreview: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  avatarStack: {
    flexDirection: 'row',
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  stackMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  stackMoreText: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.primary,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
  guestInputs: {
    marginBottom: 16,
    gap: 12,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerHighest,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  signBtn: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  signedBtn: {
    backgroundColor: COLORS.success,
    shadowColor: COLORS.success,
  },
  signBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  }
});
